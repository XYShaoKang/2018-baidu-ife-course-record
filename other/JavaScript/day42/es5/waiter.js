
// 服务员类
function Waiter(name, wages) {
    // 单例
    // if (Waiter.prototype._waiter) {
    //     return Waiter.prototype._waiter
    // }
    // Waiter.prototype._waiter = this
    Staff.call(this, 1, name, wages)
    this.waiterId
    this.entity = $('<div>')
    this.entity.addClass('waiter')
    this.entity.attr('id', 'waiter_' + this.id)
    this.entity.text('服务员' + this.id)
    this.entity.css({
        width: 100,
        height: 20,
    })
    // 工作状态 0:空闲 1:忙碌
    this.workState = 0
    this.prompt = new Prompt()
    this.prompt.text('空闲')
    this.entity.append(this.prompt.entity)

    // 任务队列
    this.works = []
    this.works.length
    // 菜单
    this.cookbook = []
    // 收钱
    this.income = null
    // 根据座位id获取菜单
    this.getOrderDishListBySeatId = null
    var that = this
    events.on('waiterTask_' + this.id, (work) => { that._addWork(work) })
    // events.on('foodComplete_'+this.id, (work) => { that._addWork(work) })
    // events.on('checkOut_'+this.id, (work) => { that._addWork(work) })
}
inherit(Waiter, Staff)
// 工作 点菜+送菜单 上菜 结账
Waiter.prototype.work = function (param) {
    var that = this
    var moveTime = 500
    switch (param.action) {
        // case 'orderDishes': // 点菜
        //     var seat = param.seat
        //     var seatPos = seat.pos
        //     console.log(`服务员前往 ${seat.id}号桌 点菜`);
        //     var p = new Promise(function (resolve, reject) {
        //         that.prompt.text('前往点菜')
        //         resolve()
        //     })
        //     p = p
        //         .then(() => that.move({ x: seatPos.x, y: seatPos.y - 50, t: moveTime }))
        //         .then(function () {
        //             return new Promise(function (resolve) {
        //                 that.prompt.text('等待客人点菜')
        //                 resolve(that.cookbook)
        //             })
        //         })
        //         .then(cookbook => seat.customers[0].order(cookbook))// 把菜单给客人
        //         .then(orderDishList => {// 把点菜单送到厨房
        //             seat.orderDishList = orderDishList
        //             console.log(`客人点了 【${orderDishList.map(v => v.name).join('、')}】 ，把点菜单送往厨房`)
        //             that.prompt.text('把点菜单送往厨房')
        //             return new Promise(function (resolve) { resolve() })

        //         })
        //         .then(() => that.move({ x: 210, y: 275, t: moveTime }))
        //         .then(() => {
        //             return new Promise(function (resolve) {
        //                 that.prompt.text(`客人点了 【${seat.orderDishList.map(v => v.name).join('、')}】`)
        //                 // that.prompt.text('空闲')
        //                 that.workState = 0
        //                 // that.prompt.text('空闲')
        //                 events.emit('toMenu', { orderDishList: seat.orderDishList, seat: seat });
        //                 resolve()
        //             })
        //         })
        //     break;
        case 'serveDishes': // 上菜
            // 去厨房拿菜
            var food = param.food
            var p = new Promise(function (resolve, reject) {
                that.prompt.text('前往厨房')
                resolve()
            })
            p.then(() => that.move({ x: 210, y: 275, t: moveTime }))
            for (const seat of param.seats) {
                p = p
                    .then(() => {
                        return new Promise(function (resolve, reject) {
                            var seatPos = seat.pos
                            console.log('服务员上菜')
                            that.prompt.text('上菜中')
                            resolve(seatPos)
                        })
                    })
                    .then((seatPos) => that.move({ x: seatPos.x, y: seatPos.y - 50, t: moveTime }))
                    .then(() => {
                        return new Promise(function (resolve, reject) {
                            that.prompt.text(`${food.name} 已上菜`)
                            seat.foods.push(food)
                            resolve()
                        })
                    })
            }
            p.then(() => new Promise(function (resolve, reject) {
                that.workState = 0
                resolve()
            }))
            break;
        case 'checkOut': // 结账
            var seatPos = param.seat.pos
            var p = new Promise(function (resolve, reject) {
                that.prompt.text('前往结账')
                resolve()
            })
            p = p.then(() => that.move({ x: seatPos.x, y: seatPos.y - 50, t: moveTime }))
                .then(() => {
                    return new Promise(function (resolve, reject) {
                        var orderDishList = param.seat.orderDishList
                        var money = orderDishList.reduce((total, currentValue) => { return total + currentValue.price }, 0)
                        that.income(money, param.seat)
                        console.log(`总共消费 【${money}元】已结账`)
                        that.workState = 0
                        resolve()
                    })
                })
            break;
        default:
            break;
    }
}
//巡视，查看是否有客人就座并未点菜。
Waiter.prototype._patrol = function () {
}
// 开始上班
Waiter.prototype.goToWork = function (restaurant) {
    this.workState = 0
    // timer=setInterval(()=>{
    //     this._patrol()
    // },1000)
    this.waiterId = restaurant._works.waiter.length
    this.entity.css({
        bottom: 0,
        left: 210 + 100 * this.waiterId
    })
    restaurant.entity.append(this.entity)
    restaurant._works.waiter.push(this)
    this.income = function (money, seat) {
        restaurant.cash += money
        restaurant.cashShow.text(`现金：${restaurant.cash}`)
        restaurant.leaveCustomer(seat)
    }
    this.cookbook = restaurant._cookbook
    this._loopWork()
}
// 下班
Waiter.prototype.goOffWork = function () {
    // clearInterval(timer)
    this.state = 2
}
Waiter.prototype.goToRestingArea = function () {
    var that = this
    that.prompt.text('空闲')
    return that.move({ x: 210 + 100 * this.waiterId, y: 600 - 20, t: 500 }).then(function () {
        return new Promise(function (resolve, reject) {
            that.prompt.text('空闲')
            resolve()
        })
    })
}
// 结账
Waiter.prototype.checkOut = function (process) {
    process.state = 6
    var money = process.orderDishList.reduce((total, currentValue) => { return total + currentValue.price }, 0)
    this.income(money)
    console.log(`总共消费 【${money}元】已结账`)
    process.restaurant.leaveCustomer(process)
}
// 移动
Waiter.prototype.move = function ({ x, y, t }) {
    return this.entity.animate({ left: x, top: y }, t).promise()
}
// 处理任务队列
Waiter.prototype._loopWork = function () {
    var that = this
    var i = 0
    setInterval(function () {
        if (that.workState === 0) {
            if (that.works.length > 0) {
                i = 0
                that.workState = 1
                that.work(that.works.splice(0, 1)[0])
            } else {
                i++
            }
        }
        if (i > 50) {
            i = 0
            that.goToRestingArea()
        }
    }, 10)
}
Waiter.prototype._addWork = function (work) {
    var that = this
    // 如果是上菜行为，则放入最近的两次点菜行为之间
    if (work.action === 'serveDishes') {
        var i = that.works.findIndex(w => w.action === 'orderDishes')
        if (that.works[i + 1] && that.works[i + 1].action === 'orderDishes') {
            that.works.splice(i, 0, work)
            return
        }
    }
    // 如果是结账行为，则放入最近的上菜行为之后
    if (work.action === 'checkOut') {
        var i = that.works.findIndex(w => w.action === 'serveDishes')
        that.works.splice(i, 0, work)
        return
    }
    that.works.push(work)
}



