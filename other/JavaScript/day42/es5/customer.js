//顾客类
function Customer(name) {
    this.id=this.addId()
    this.name=name
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
Customer.prototype.order = function (cookbook) {
    console.log('客人在点菜')
    var orderDishList = []
    orderDishList.push(cookbook[random(0, cookbook.length)])
    return orderDishList
}

Customer.prototype.eat = function (process) {
    console.log('客人正在吃饭')
    setTimeout(() => {
        process.state = 6
        console.log('吃完了，服务员结账')
        process.waiter.checkOut(process)
    }, random(3, 5) * 1000);

};