//菜品类
function Food(name, cost, price) {
    this.id = this.addId()
    this.name = name
    //成本
    this.cost = cost
    this.price = price
}
Food.prototype.addId = (function addId() {
    var id = 1
    return () => {
        return id++
    }
}())