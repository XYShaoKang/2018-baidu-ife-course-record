//厨师类
function Cook(name, wages) {
    // 单例
    // if (Cook.prototype._cook) {
    //     return Cook.prototype._cook
    // }
    // Cook.prototype._cook = this
    Staff.call(this, 2, name, wages)
    this.entity = $('<div>')
    this.entity.addClass('cook')

    this.entity.attr('id', 'cook_' + this.id)
    this.entity.text('厨师' + this.id)
    this.entity.css({
        left: 30,
        top: 0,
        width: 50,
        height: 20,
    })
    this.prompt = new Prompt()
    this.prompt.text('空闲')
    this.entity.append(this.prompt.entity)
    // 待做的菜列表
    this.foods = []
    this.notDoneDishList = $('<div>')
    this.notDoneDishList.addClass('ndd')
    this.entity.append(this.notDoneDishList)
    // 任务队列
    this.promise = new Promise(function (resolve, reject) { resolve() })
    // 工作状态 0:空闲 1:忙碌
    this.workState = 0
    var that = this
    events.on('cookTask_' + this.id, param => that.receiveMenu(param))

}
inherit(Cook, Staff)
// 开始上班
Cook.prototype.goToWork = function (restaurant) {
    this.workState = 0
    this.entity.css({
        top: 80 + restaurant._works.cook.length * 210
    })
    restaurant._works.cook.push(this)
    restaurant.entity.append(this.entity)
}
// 接收点菜单
Cook.prototype.receiveMenu = function (param) {
    var that = this;
    // console.log(param)
    for (const food of param.orderDishList) {
        var dish = that.foods.find(f => f.food.id === food.id && !f.state)
        if (dish) {
            dish.seats.push(param.seat)
        } else {
            dish = {
                food: food,
                seats: [param.seat],
                state: false
            }
            that.foods.push(dish)
            that.promise = that.promise.then(() => {
                return that.work()
            })
        }
        that.setNotDoneDishList(dish)
    }
}
// 工作
Cook.prototype.work = function () {
    var that = this
    var dish = that.foods.find(f => !f.state)
    var food = dish.food
    console.log(food.name)
    return new Promise((resolve, reject) => {
        console.log(`厨师正在烧 【${food.name}】`)
        var time = food.cookingTime * 1000
        var timer = setInterval(function () {
            that.prompt.text(`正在烧 【${food.name}】 ,还差${(time / 1000).toFixed(1)}s烧完`)
            time = time - 100
            if (time < 0) {
                clearInterval(timer)
                that.prompt.text(`【${food.name}】 做好了`)
            }
        }, 100)

        setTimeout(() => {
            dish.state = true
            console.log(`【${food.name}】 已做好，通知服务员上菜`)

            that.setNotDoneDishList(dish)

            events.emit('foodComplete', { action: 'serveDishes', food: food, seats: dish.seats })
            resolve()
        }, food.cookingTime * 1000 + 1000);
    })
}
// 待做菜列表显示
Cook.prototype.setNotDoneDishList = function (dish) {

    for (const seat of dish.seats) {
        var ul = this.notDoneDishList.find('#food_' + seat.id)
        if (!this.foods.find(f => !f.state && f.seats.includes(seat))) {
            ul.remove()
            continue
        }

        if (ul.length === 0) {
            var ul = $('<ul>')
            ul.attr('id', 'food_' + seat.id)
            this.notDoneDishList.append(ul)
        }
        var li = ul.find('#food_' + seat.id + '_' + dish.food.id)
        if (li.length === 0) {
            var li = $('<li>')
            li.attr('id', 'food_' + seat.id + '_' + dish.food.id)
            ul.append(li)
        }
        li.text(dish.food.name)
        li.css('color', dish.state ? 'green' : 'red')

    }

}