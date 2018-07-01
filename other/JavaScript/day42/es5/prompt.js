// 提示信息
function Prompt() {
    this.entity = $('<div>')
    this.entity.addClass('prompt')
    this.entity.attr('id', 'prompt')
    // this.entity.text('客人')
    this.entity.css({
        width: 100
    })
}
Prompt.prototype.show = function (str, time) {
    var that = this.entity
    that.text(str)
    that.css({
        top: that.outerHeight(true) * -1 - 10
    })
    that.show(200, function () {
        if (time) {
            setTimeout(() => {
                that.hide(200)
            }, time - 400);
        }
    })
}
Prompt.prototype.text = function (str) {
    var that = this.entity
    that.text(str)
    that.css({
        bottom: 30,
        left: 0
    })

}
Prompt.prototype.hide = function () {
    var that = this.entity
    that.hide()
}