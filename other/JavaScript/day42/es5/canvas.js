
function Canvan() {
    var canvas = document.getElementsByTagName('canvas')
    var ctx = canvas.getContext('2d');
    this.draw=(x,y,width,height,color)=>{
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.fillRect(x,y,width,height)
        ctx.fill();
    }
}