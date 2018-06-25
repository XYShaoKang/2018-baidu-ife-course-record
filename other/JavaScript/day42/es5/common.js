// 继承方法
var inherit = (function () {
    function F() { }
    return function (Target, Origin) {
        F.prototype = Origin.prototype;
        Target.prototype = new F();
        Target.prototype.constuctor = Target;
        Target.prototype.uber = Origin.prototype;
    }
}())
// 获取随机数方法
function random(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}
