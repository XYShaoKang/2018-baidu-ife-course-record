//顾客类
function Customer(name) {
    this.id = this.addId()
    this.name = name
    this.orderDishList = []
    this.seat
    this.entity = $('<div>')
    this.entity.addClass('customer')
    this.entity.attr('id', 'customer_' + this.id)
    this.entity.text(`客人 【${this.name}】`)
    this.entity.css({
        height: 20,
    })
    this.prompt = new Prompt()
    this.prompt.text('等待点菜')
    this.entity.append(this.prompt.entity)
    // 顾客状态 0:点菜 1:等待上菜 2:正在吃
    this.status = 0
    // 已经吃掉的菜
    this.eatFoods = []
}
Customer.prototype.addId = (function addId() {
    var id = 1
    return () => {
        return id++
    }
}())
// 点菜
Customer.prototype.order = function (cookbook) {
    var that = this
    console.log('客人在点菜')
    return new Promise(function (resolve, reject) {
        // 点菜时间
        var time = 3000
        var timer = setInterval(function () {
            that.prompt.text(`点菜中，还差${(time / 1000).toFixed(1)}s时间`)
            time = time - 100
            if (time < 0) {
                clearInterval(timer)
                that.state = 1
                that.prompt.text(`等待上菜`)
                var orderDishList = []
                var count = random(2, 6)
                for (let i = 0; i < count; i++) {
                    while (true) {
                        // let food = cookbook[random(0, cookbook.length)]
                        let food = cookbook[random(0, 6)]
                        if (!orderDishList.includes(food)) {
                            orderDishList.push(food)
                            break;
                        }
                    }
                }
                that.orderDishList = orderDishList
                that.wait()
                resolve(orderDishList)
            }
        }, 100)
    })

}

// 吃饭
Customer.prototype.wait = function () {

    var that = this
    var time = 3000
    var food
    var timer = setInterval(function () {
        food = that.seat.foods.find(f => !that.eatFoods.includes(f))
        if (that.state === 1 && food) {
            that.state = 2
            time = 3000
        }
        if (that.state === 2) {
            that.prompt.text(`正在吃 【${food.name}】,还差${(time / 1000).toFixed(1)}s吃完`)
            time = time - 100
            if (time < 0) {
                // clearInterval(timer)
                that.eatFoods.push(food)
                that.state = 1
                that.prompt.text(`等待上菜`)
                if (that.eatFoods.length === that.orderDishList.length) {
                    clearInterval(timer)
                    events.emit('checkOut', { action: 'checkOut', seat: that.seat })
                    // process.waiter.checkOut(process)
                    that.prompt.text(`结账`)
                }
            }
        }

    }, 100)

};

// 离开
Customer.prototype.leave = function () {
    this.entity.remove()
};
Customer.prototype.move = function (x, y) {
    this.entity.css({
        left: x + 50,
        top: y + 30
    })
};