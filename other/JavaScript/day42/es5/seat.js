//座位
function Seat() {
    
    // 单例
    // if (Seat.prototype._seat) {
    //     return Seat.prototype._seat
    // }
    // Seat.prototype._seat = this
    this.id = this.addId()
    this.pos={
        x:0,
        y:0
    }
    this.entity= $('<div>')
    this.entity.addClass('seta')
    this.entity.attr('id', 'seat_' + this.id)
    this.entity.css({
        left: 100,
        top: 0,
        width: 50,
        height: 50,
        backgroundColor: '#000000'
    })
    //座位状态  0:空座   1:客人入座  2:未点菜  3:已点菜 4:菜已上齐  5:客人离开
    this.state = 0
    // 食物
    this.foods=[]
    this._init()
    this.customers=[]
    this.orderDishList=[]
    
}
Seat.prototype.addId = (function addId() {
    var id = 1
    return () => {
        return id++
    }
}())

//入座
Seat.prototype.sitDown = function (customers) {
    this.customers=customers
    this.customers[0].move(this.pos.x,this.pos.y)
    this.customers[0].seat=this
    this.state = 1
}
//点菜
Seat.prototype._order = function () {
    this.state = 2
}
//上菜
Seat.prototype._serving = function () {
    this.state = 3
}
//离座
Seat.prototype.standUp = function () {
    this._init()
}
Seat.prototype._init = function () {
    
    this.state = 0
    this.foods=[]
    this.customers=[]
    this.orderDishList=[]
}
Seat.prototype.move = function (x,y) {
    this.pos.x=x
    this.pos.y=y
    this.entity.css({
        left: x,
        top: y
    })
}