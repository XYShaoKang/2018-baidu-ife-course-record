//表单
var from = (function () {
    var fromDiv = document.getElementById('from');
    var fromElement = document.createElement('from');
    fromDiv.appendChild(fromElement);
    var cacheDatas;
    var changeDatas;
    //表单元素创建
    function create(id, data) {

        var ul = document.createElement('ul');
        ul.id = id;

        for (let index = 0; index < data.length; index++) {
            var li = document.createElement('li');
            var checkbox = document.createElement('input');
            var label = document.createElement('label');
            checkbox.type = 'checkbox'
            if (ul.children.length == 0) {
                checkbox.name = `${id}_all`;
                checkbox.id = `${id}_all`;
                checkbox.value = -1;
                label.innerText = '全选';
                label.setAttribute('for', `${id}_all`);
                li.appendChild(checkbox);
                li.appendChild(label);
                ul.appendChild(li);

                li = document.createElement('li');
                checkbox = document.createElement('input');
                checkbox.type = 'checkbox'
                label = document.createElement('label');
            }
            checkbox.value = index;
            checkbox.id = `${id}_${index}`;
            checkbox.name = `${id}_${index}`;

            label.innerText = data[index];
            label.setAttribute('for', `${id}_${index}`);
            li.appendChild(checkbox);
            li.appendChild(label);
            ul.appendChild(li);
        }
        ul.onchange = optionOnChange;
        fromElement.appendChild(ul);
    }
    //刷新表单
    function render() {
        fromElement.innerHTML = '';


        for (const key in cacheDatas) {
            if (cacheDatas.hasOwnProperty(key)) {
                const element = cacheDatas[key];
                create(key, element);
            }
        }
    }
    //设置数据
    function setData(datas) {
        cacheDatas = datas;
        changeDatas = {};
        for (const key in datas) {
            if (datas.hasOwnProperty(key)) {
                const element = datas[key];
                for (let i = 0; i < element.length; i++) {
                    changeDatas[key] = changeDatas[key] || [];
                    changeDatas[key].push({ change: false, value: i });
                }
            }
        }

        render();
    }
    //表单事件
    function optionOnChange(e, params) {
        changeDatas[e.currentTarget.id] = changeDatas[e.currentTarget.id] || [];
        if (e.target.value == -1) {
            allChange(e);
        } else {
            
            var count=Enumerable.from(changeDatas[e.currentTarget.id]).where(d => d.change).toArray().length;
            if (e.target.checked) {
                if (count==changeDatas[e.currentTarget.id].length-1) {
                    e.currentTarget.children[0].children[0].checked=true;
                    
                }
            }
            else{
                if (count==1) {
                    e.target.checked=true;
                    return false;
                }
                
                if (count==changeDatas[e.currentTarget.id].length) {
                    e.currentTarget.children[0].children[0].checked=false;
                }
            }
            changeDatas[e.currentTarget.id][e.target.value].change = !changeDatas[e.currentTarget.id][e.target.value].change;
        }
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
        var t = {};
        t[e.target.id] = [];
        t[e.target.id].push(e.target.value);
        events.emit('optionOnChange', temp);
    }
    //全选事件
    function allChange(event) {
        for (const item of event.currentTarget.children) {
            for (const iterator of item.children) {
                iterator.checked = event.target.checked;
            }
        }
        for (const item of changeDatas[event.currentTarget.id]) {
            item.change = event.target.checked;
        }
    }
    // 监听维度数据变化
    events.on('upDim', setData);
})();


