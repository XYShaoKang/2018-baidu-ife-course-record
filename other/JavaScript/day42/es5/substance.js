
// 实体
function Substance(element, x, y, width, height, color, opacity) {
    this.element = element
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
    this.opacity = opacity
    console.log(this)
    this._init()
}
Substance.prototype.move = function (x, y, time) {
    this.element.animate({ left: x - this.x, top: y - this.y }, time)
    this.x = x
    this.y = y
}
Substance.prototype._init = function () {
    this.element.css({
        left: this.x,
        top: this.y,
        width: this.width,
        height: this.height,
        backgroundColor: this.color
    })
}