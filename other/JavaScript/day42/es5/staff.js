//职员类
function Staff(staffType, name, wages) {
    this.id = this.addId()
    //职员类型  1:服务员  2:厨师
    this.staffType = staffType
    //职员状态  -1:离职  0:在职  1:上班  2:下班
    this.state = 0
    this.name = name
    this.wages = wages
}
Staff.prototype.addId = (function addId() {
    var id = 1
    return () => {
        return id++
    }
}())
Staff.prototype.work = function () {
    console.log('work')
}


function Waiter(name, wages) {
    // 单例
    if (Waiter.prototype._waiter) {
        return Waiter.prototype._waiter
    }
    Staff.call(this, 1, name, wages)
    this.cookbook = []
    this._timer
    Waiter.prototype._waiter = this
}
inherit(Waiter, Staff)
// 工作
Waiter.prototype.work = function (process) {
    if (process instanceof Process) {
        if (process.state === 1) {
            process.waiter = this
            console.log(`服务员前往 ${process.seat.id}号桌 点菜`);
            this.deliveryMenu(process)
        } else if (process.state === 2) {
            console.log(`客人点了 【${process.orderDishList[0].name}】，把点菜单送往厨房`)
            process.cook.work(process)
        } else if (process.state === 4) {
            console.log('服务员上菜')
            process.state = 5
            process.customers[0].eat(process)
        }
    }
}
// 递菜单
Waiter.prototype.deliveryMenu = function (process) {
    console.log('服务员递菜单给客人')
    process.orderDishList = process.customers[0].order(this.cookbook)
    setTimeout(() => {
        process.state = 2
        this.work(process)
    }, random(3, 5) * 1000);

}
//巡视，查看是否有客人就座并未点菜。
Waiter.prototype._patrol = function () {
}
// 开始上班
Waiter.prototype.goToWork = function () {
    this.state = 1
    // timer=setInterval(()=>{
    //     this._patrol()
    // },1000)
}
// 下班
Waiter.prototype.goOffWork = function () {
    clearInterval(timer)
    this.state = 2
}
// 结账
Waiter.prototype.checkOut = function (process) {
    process.state = 7
    console.log(`总共消费 【${process.orderDishList[0].price}元】已结账`)
    process.restaurant.leaveCustomer(process)
}



//厨师类
function Cook(name, wages) {
    // 单例
    if (Cook.prototype._cook) {
        return Cook.prototype._cook
    }
    Staff.call(this, 2, name, wages)
    Cook.prototype._cook = this
}
inherit(Cook, Staff)
// 工作
Cook.prototype.work = function (process) {
    console.log(`厨师正在烧 【${process.orderDishList[0].name}】`)
    setTimeout(() => {
        process.state = 3
        console.log(`【${process.orderDishList[0].name}】 已做好，通知服务员上菜`)
        process.state = 4
        process.waiter.work(process)
    }, random(3, 5) * 1000);

}
