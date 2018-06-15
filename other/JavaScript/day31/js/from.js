//表单
var from = (function ($) {
    var $fromDiv = $('#from');
    var $fromElement = $('<from>');
    $fromDiv.append($fromElement);
    var cacheDatas;//数据缓存
    var changeDatas;
    //表单元素创建
    function create(id, data) {
        var $ul = $('<ul>');
        $ul.attr('id', id);
        $.each(data, (i, v) => {
            if ($ul.children().length == 0) {
                $ul.append(createLi(`${id}_all`, -1, '全选'));
            }
            $ul.append(createLi(`${id}_${i}`, i, data[i]));
        })
        $ul.on('click', 'input', (e) => {
            optionOnChange(e.target);
            var temp = {};
            Enumerable.from(changeDatas)
                .where(
                    data => Enumerable.from(data.value)
                        .where(d => d.change == true)
                        .toArray().length > 0
                )
                .toArray()
                .forEach(
                    (d) => {
                        d.value.forEach(
                            (item) => {
                                temp[d.key] = temp[d.key] || [];
                                if (item.change) {
                                    temp[d.key].push(item.value);
                                }
                            }
                        );
                    }
                );
            console.log(temp);

            events.emit('optionOnChange', temp);
        });
        $fromElement.append($ul);
    }
    function createLi(id, value, labelText) {
        var li = $('<li>');
        var checkbox = $('<input>').attr('type', 'checkbox');
        var label = $('<label>');
        checkbox.attr({
            'name': id,
            id: id,
            value: value
        })
        label.text(labelText).attr('for', id);
        li.append(checkbox).append(label);
        return li;
    }
    //刷新表单
    function render() {
        $fromElement.html('');
        $.each(cacheDatas, (k, v) => {
            create(k, v);
        })
    }
    //设置数据
    function setData(datas) {
        cacheDatas = datas;
        changeDatas = {};
        $.each(datas, (k, data) => {
            $.each(data, (i, d) => {
                changeDatas[k] = changeDatas[k] || [];
                changeDatas[k].push({ change: false, value: i });
            })
        })
        render();
    }
    //单选框改变事件
    function optionOnChange(target, change) {


        var that = $(target);
        change = change != undefined ? change : that.prop('checked');
        var key = that.attr('id').split('_')[0];
        var index = that.attr('id').split('_')[1];
        var $ul = that.parents().eq(1);
        if (that.val() == -1) {//全选
            // console.log(target,change,that.prop('checked'));
            $ul.find('input').prop('checked', change);

            $.each(changeDatas[key], (i, v) => {
                v.change = change;
            });
        } else {
            that.prop('checked', change);
            changeDatas[key][index].change = change
        }
        if ($ul.find('input[value!=-1]:checked').length == $ul.find('input[value!=-1]').length) {//判断是否全部被选中
            $ul.find('input').prop('checked', true);
        } else {
            $ul.find('input').eq(0).prop('checked', false);
        }
    }
    //更新数据
    function upData(datas) {
        console.log(datas);
        $.each(changeDatas, (k, data) => {
            // $('#' + k + '_all').trigger('change');
            optionOnChange($('#' + k + '_all'), true)
            if (datas.hasOwnProperty(k)) {
                $.each(data, (i, d) => {
                    if (!(datas[k].indexOf(d.value) != -1)) {
                        optionOnChange($('#' + k + '_' + d.value), false);
                    }
                })
            }
        })
    }
    // 监听维度数据变化
    events.on('setDim', setData);
    events.on('upDim', upData);
})(jQuery);


