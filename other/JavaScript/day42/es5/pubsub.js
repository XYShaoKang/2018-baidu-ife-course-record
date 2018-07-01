// 事件处理
var events={
    events:{},
    on:function (eventName,fn) {  
        this.events[eventName]=this.events[eventName]||[];
        this.events[eventName].push(fn);
    },
    off:function (eventName,fn) {  
        if (this.events[eventName]) {
            for (let index = 0; index < events[eventName].length; index++) {
                if (events[eventName][index]===fn) {
                    this.events[eventName].splice(index,1);
                    break;
                }
                
            }
        }
    },
    emit:function (eventName,data) {  
        if (this.events[eventName]) {
            for (const fn of this.events[eventName]) {
                fn(data);
            }
        }
    }
}