var queue = {
    data: ["apple", "pear"],
    showP: document.getElementById('queue-cont'),
    enqueue: function (params) {
        if (params && params != '') {
            this.data.push(params);
            this.show();
        }

    },
    dequeue: function () {
        if (!this.isEmpty()) {
            this.data.shift();
        }
        this.show();
    },
    show: function () {
        this.showP.innerHTML = `队列内容：${this.data.join('-&gt;')}`
    },
    isEmpty: function () {
        if (this.data.length == 0) {
            return true;
        }
        return false;
    },
    printFront:function () {
        console.log(this.data[this.data.length-1]);
        
    }
};
var addInput = document.getElementById('queue-input');
document.getElementById('in-btn').onclick = () => {
    queue.enqueue(addInput.value);
}
document.getElementById('out-btn').onclick = () => {
    queue.dequeue();
}
document.getElementById('font-btn').onclick = () => {
    queue.printFront();
}
document.getElementById('empty-btn').onclick = () => {
    if (queue.isEmpty()) {
        console.log('队列为空');
    }else{
        console.log('队列不为空');
    }
}

var queue1 = {
    data: ["apple", "pear"],
    showP: document.getElementById('queue-cont1'),
    enqueue: function (params) {
        if (params && params != '') {
            this.data.unshift(params);
            this.show();
        }

    },
    dequeue: function () {
        if (!this.isEmpty()) {
            this.data.pop();
        }
        this.show();
    },
    show: function () {
        this.showP.innerHTML = `队列内容：${this.data.join('&lt;-')}`
    },
    isEmpty: function () {
        if (this.data.length == 0) {
            return true;
        }
        return false;
    },
    printFront:function () {
        console.log(this.data[0]);
    }
};

var addInput1 = document.getElementById('queue-input1');
document.getElementById('in-btn1').onclick = () => {
    queue1.enqueue(addInput1.value);
}
document.getElementById('out-btn1').onclick = () => {
    queue1.dequeue();
}
document.getElementById('font-btn1').onclick = () => {
    console.log(queue1.data[0]);
}
document.getElementById('empty-btn1').onclick = () => {
    if (queue1.isEmpty()) {
        console.log('队列为空');
    }else{
        console.log('队列不为空');
    }
}