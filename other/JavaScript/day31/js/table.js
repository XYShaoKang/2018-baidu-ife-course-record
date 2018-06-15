//表格
var table = (function () {
    //表头,将来从外部传入
    var cacheDatas;//缓存数据
    var tableHead;
    var cacheIndex;
    var $tableDiv = $('#table');//表格外部div
    var $tableElement = $('<table>');//表格元素
    var $button;
    $tableDiv.append($tableElement);
    //刷新表格
    function render() {
        var $head = $('<tr>');
        $.each(tableHead, function (i, item) {
            $('<th>').text(item).appendTo($head);
        })
        $tableElement.append($head);
        var tempTd;
        var width = 70;
        var height = 25;
        $.each(cacheDatas, (i, data) => {
            var $row = $('<tr>');
            var span = false;

            $.each(data, (j, text) => {

                var $td = $('<td>').text(text);
                //判断合并
                if (j == 0) {
                    if (tempTd && tempTd.text() == $td.text()) {
                        var rowSpan = tempTd.attr('rowSpan');
                        if (rowSpan) {
                            rowSpan = 2;
                        }
                        tempTd.attr('rowSpan', rowSpan + 1);
                        return;
                    }
                    tempTd = $td;
                } else {
                    if (j > 1) {
                        $td.attr('c_index', j);
                    }
                }
                $td.attr('r_index', i);
                $td.css({ width: width, height: height });

                $row.append($td);

            });
            $row.attr('r_index', i);
            $tableElement.append($row);
        });

    }
    //单元格鼠标移入事件
    $tableElement.on('mouseenter', 'td[r_index]', (e) => {

        // console.log(e,e.target,e.currentTarget);
        var that = $(e.currentTarget);
        var index = that.parent().attr('r_index');
        if (cacheIndex != index) {
            cacheIndex = index;
            events.emit('hoverRow', [cacheDatas[index]]);
        }
        //判断是否已经在编辑状态和是否可编辑
        if (!that.hasClass('edit') && that.attr('c_index')) {
            //鼠标经过添加编辑图标
            that.addClass('edit-icon');
        }
    })

    //单元格鼠标移出事件
    $tableElement.on('mouseleave', 'td[r_index]', (e) => {
        events.emit('hoverRow', cacheDatas);
        cacheIndex = -1;
        $(e.currentTarget).removeClass('edit-icon');
        // console.log(e.currentTarget);
    })
    //单元格鼠标点击事件
    $tableElement.on('click', 'td[c_index]', (e) => {
        var that = $(e.currentTarget);
        if (!that.hasClass('edit')) {
            var value = that.text();
            that.addClass('edit');
            var input = $('<input>').attr('type', 'text').val(value);
            input.css({ width: that.width(), height: that.height() });
            var check = $('<span>').addClass('check fas fa-check');
            var close = $('<span>').addClass('close fas fa-times');
            that.empty().append(input).removeClass('edit-icon');
            that.append(check);
            that.append(close);
            input.focus();
        }
    })
    //单元格按键监听事件
    $tableElement.on('keyup', 'input', (e) => {
        var that = $(e.currentTarget);
        if (e.keyCode == 13) {//回车键
            that.next().click();
        } else if (e.keyCode == 27) {//ESC
            that.next().next().click();
        }
    })
    //单元格失去焦点事件
    $tableElement.on('focusout', 'input', (e) => {
        $(e.currentTarget).next().next().click();
    })

    //编辑事件
    $tableElement.on('click', 'span', (e) => {
        e.stopPropagation();
        var that = $(e.target);

        if (that.hasClass('check')) {//确认
            // check(that.parent().attr('r_index'),that.parent().attr('c_index'),that.prev().val())
            var value = that.prev().val();
            if (isNum(value)) {
                cacheDatas[that.parent().attr('r_index')][that.parent().attr('c_index')] = value;
                that.parent().empty().removeClass('edit').text(value);
            } else {
                alert('内容包含非数字，请修改！');
            }
        } else if (that.hasClass('close')) {//取消
            var value = cacheDatas[that.parent().attr('r_index')][that.parent().attr('c_index')];
            that.parent().empty().removeClass('edit').text(value);
        }


    })
    //判断是否为数字
    function isNum(value) {
        return /^[\d]+$/.test(value);
    }
    //设置数据
    function setData(tableDatas) {
        $tableElement.empty();
        cacheDatas = tableDatas.tableData;
        tableHead = tableDatas.tableHead;
        events.emit('hoverRow', cacheDatas);
        render();
        if (!$button) {
            $button = $('<button>').text('保存').attr('id', 'save');
            $button.on('click', () => {
                events.emit('save', cacheDatas);
            });
            $tableDiv.append($button);
        }
    }
    //监听表格数据变化
    events.on('upDatas', setData);
})();