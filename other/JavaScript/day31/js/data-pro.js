//数据处理

var dataPro = (function ($) {
    var cacheDatas = [];//数据缓存
    var dimensions = {};//维度
    var tableHead_cn = [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月'
    ];
    var tableHead_en = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Agu',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];
    //获取数据
    function getDatas(fn) {
        var url='./js/data.js';
        var storage = window.localStorage;
        if (storage && storage.data) {
            fn(JSON.parse(storage.data));
            // console.log(JSON.parse(storage.data));
            
        } else {
            $.ajax({
                url: url,
                success: function (result) {
                    // console.log(sourceData);
                    storage.data = JSON.stringify(sourceData);
                    fn(sourceData);
                }
            })
        }
    }
    //保存数据
    function saveDatas(datas) {
        var storage = window.localStorage;
        if (storage) {
            var tempDatas = [];
            $.each(datas, (i, d) => {
                tempDatas.push({product:d[0],region:d[1],sale:d.slice(2,d.length)})
            })
            storage.data = JSON.stringify(tempDatas);
            
        }
    }
    //提取维度数据
    function convertToDim(dim) {
        for (const d of dim) {
            dimensions[d] = Enumerable.from(cacheDatas)
                .groupBy(data => data[d])
                .select(data => data.first()[d])
                .toArray();
        }
        setDim(dimensions);
    }
    //将数据转换成表
    function convertToTabale(data, dims) {
        var tableHead = [];
        var keys = [];
        Enumerable.from(dims).orderBy(d => d.value.length != 1).toArray().forEach(d => keys.push(d.key));
        var tableData = Enumerable.from(data)
            .select(data => {
                var temp = [];

                for (const d of keys) {
                    temp.push(data[d]);
                }
                for (const item of data.sale) {
                    temp.push(item);
                }
                return temp;
            }).toArray();
        for (const k of keys) {
            tableHead.push(k);
        }
        for (const h of tableHead_en) {
            tableHead.push(h);
        }

        // if(Enumerable.from(tableData).groupBy(d=>log(d)))
        return { tableHead: tableHead, tableData: tableData };
    }
    //设置数据
    function setData(datas) {
        cacheDatas = datas;
        var dim = ["product", "region"];//定义的维度,将来从外部传入
        convertToDim(dim);
        upDatas(convertToTabale(cacheDatas, dimensions));
    }
    //表单事件
    function changeDim(e) {


        var dims = {};
        Enumerable.from(dimensions)
            .where(
                dim => e[dim.key]
            )
            .toArray()
            .forEach(
                d => dims[d.key] = d.value
            );
        for (const key in dims) {
            if (dims.hasOwnProperty(key)) {
                const dim = dims[key];
                dims[key] = Enumerable.from(dims[key])
                    .where((val, j) => e[key].indexOf(j) != -1)
                    .toArray();
            }
        }
        var tempData = Enumerable.from(cacheDatas)
            .where(d => {
                for (const key in dims) {
                    if (dims.hasOwnProperty(key)) {
                        const dim = dims[key];
                        if (dim.indexOf(d[key]) == -1) {
                            return false;
                        }
                    }
                }
                return true;
            }).toArray();
        for (const key in dimensions) {
            if (dimensions.hasOwnProperty(key)) {
                const dim = dimensions[key];
                if (!dims[key]) {
                    dims[key] = dim;
                }
            }
        }
        upDatas(convertToTabale(tempData, dims));
    }
    // 发射维度数据改变
    function setDim(data) {
        events.emit('setDim', data);
    }
    // 发射表格数据选择改变
    function upDatas(data) {
        events.emit('upDatas', data);
    }
    // 监听表单变化
    events.on('changeDim', changeDim)
    events.on('save', saveDatas);
    getDatas(function (data) {
        setData(data, ['product', 'region']);
    });
    return {
        setData: setData
    };
})(jQuery)