//菜品类
function Food(name, cost, price, time) {
    this.id = this.addId()
    // 菜名
    this.name = name
    // 成本
    this.cost = cost
    // 售价
    this.price = price
    // 烹饪事件
    this.cookingTime = time
}
Food.prototype.addId = (function addId() {
    var id = 1
    return () => {
        return id++
    }
}())