//表格
var table = (function () {
    //表头,将来从外部传入
    var cacheDatas;//缓存数据
    var tableHead;
    var cacheIndex;
    var tableDiv = document.getElementById('table');//表格外部div
    var tableElement = document.createElement('table');//表格元素
    tableDiv.appendChild(tableElement);
    function create() {
    }
    //刷新表格
    function render() {
        var head = document.createElement('tr');
        for (const iterator of tableHead) {
            var th = document.createElement('th');
            th.innerText = iterator;
            head.appendChild(th);
        }
        tableElement.appendChild(head);
        tableElement.children
        var tempTd;
        for (let i = 0; i < cacheDatas.length; i++) {
            const data = cacheDatas[i];
            var row = document.createElement('tr');
            var span = false;

            for (let j = 0; j < data.length; j++) {
                const text = data[j];

                var td = document.createElement('td');
                td.innerText = text;

                //判断合并
                if (j == 0) {
                    if (tempTd && tempTd.innerText == td.innerText) {
                        tempTd.rowSpan += 1;
                        continue;
                    }
                    tempTd = td;
                }
                if (j > 1) {
                    td.setAttribute('index', i);
                }


                row.appendChild(td);
            }
            tableElement.appendChild(row);
        }


    }
    tableDiv.onmouseover = function (e) {
        var index = e.target.getAttribute('index');
        if (index != null) {
            if (index != cacheIndex) {
                cacheIndex = index;
                events.emit('hoverRow', [cacheDatas[index]]);
            }

        } else {
            // if (cacheIndex != -1) {
            //     cacheIndex = -1;
            //     events.emit('hoverRow', cacheDatas);

            // }
            events.emit('hoverRow', cacheDatas);

        }

    };
    //设置数据
    function setData(tableDatas) {
        tableElement.innerHTML = '';
        cacheDatas = tableDatas.tableData;
        tableHead = tableDatas.tableHead;
        events.emit('hoverRow', cacheDatas);
        render();
    }
    //监听表格数据变化
    events.on('upDatas', setData);
})();