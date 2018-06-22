function Seat() {
    // 单例
    if (Seat.prototype._seat) {
        return Seat.prototype._seat
    }
    this.id = this.addId()
    //座位状态  0:空座   1:客人入座  2:未点菜  3:已点菜  4:客人离开
    this.state = 0
    Seat.prototype._seat=this
}
Seat.prototype.addId = (function addId() {
    var id = 1
    return () => {
        return id++
    }
}())

//入座
Seat.prototype.sitDown = function(process){
    process.seat=this
    this.state = 1
}
//点菜
Seat.prototype._order = function(){
    this.state = 2
}
//上菜
Seat.prototype._serving = function(){
    this.state = 3
}
//离座
Seat.prototype._standUp = function(){
    this.state = 0
}