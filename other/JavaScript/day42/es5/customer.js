//顾客类
function Customer(name) {
    this.id = this.addId()
    this.name = name

    this.entity = $('<div>')
    this.entity.addClass('customer')
    this.entity.attr('id', 'customer_' + this.id)
    this.entity.text(`客人 【${this.name}】`)
    this.entity.css({
        left: 375,
        top: 220,
        height: 20,
    })
    this.prompt = new Prompt()
    this.prompt.text('空闲')
    this.entity.append(this.prompt.entity)
    //顾客状态
    // this.status = 0;
}
Customer.prototype.addId = (function addId() {
    var id = 1
    return () => {
        return id++
    }
}())
// 点菜
Customer.prototype.order = function (cookbook,fn) {
    var that=this
    console.log('客人在点菜')
    var time = 3000
    var timer = setInterval(function () {
        that.prompt.text(`点菜中，还差${(time / 1000).toFixed(1)}s时间`)
        time = time - 100
        if (time < 0) {
            clearInterval(timer)
            that.prompt.text(`等待上菜`)
            var orderDishList = []
            var count = random(2, 6)
            for (let i = 0; i < count; i++) {
                while (true) {
                    let cook = cookbook[random(0, cookbook.length)]
                    if (!orderDishList.includes(cook)) {
                        orderDishList.push(cook)
                        break;
                    }
                }
            }
            fn(orderDishList)
        }
    }, 100)
}

// 吃饭
Customer.prototype.eat = function (process) {
    var that = this
    console.log('客人正在吃饭')
    
    var time=3000
    var timer=setInterval(function () {  
        that.prompt.text(`正在吃饭,还差${(time / 1000).toFixed(1)}s吃完`)
        time=time-100
        if (time<0) {
            clearInterval(timer)
            that.prompt.text(`等待上菜`)
            if (process.state === 4) {
                process.waiter.checkOut(process)
                that.prompt.text(`结账`)
            }
        }
    },100)
};

// 离开
Customer.prototype.leave = function () {
    this.entity.remove()
};
