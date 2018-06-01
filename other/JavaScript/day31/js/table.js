//表格
var table = (function () {
    //表头,将来从外部传入
    var cacheDatas;//缓存数据
    var tableHead;
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
        for (const data of cacheDatas) {

            var row = document.createElement('tr');
            var span = false;

            for (let i = 0; i < data.length; i++) {
                const text = data[i];

                var td = document.createElement('td');
                td.innerText = text;

                //判断合并
                if (i == 0) {
                    if (tempTd && tempTd.innerText == td.innerText) {
                        tempTd.rowSpan += 1;
                        continue;
                    }
                    tempTd = td;
                }


                row.appendChild(td);
            }
            tableElement.appendChild(row);
        }
    }
    //设置数据
    function setData(tableDatas) {
        tableElement.innerHTML = '';
        cacheDatas = tableDatas.tableData;
        tableHead = tableDatas.tableHead;
        render();
    }
    //监听表格数据变化
    events.on('upDatas', setData);
})();