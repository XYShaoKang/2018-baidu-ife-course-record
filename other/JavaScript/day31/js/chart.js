//图表

(function () {
    // var datas={
    //     product: "手机",
    //     region: "华东",
    //     sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
    // };
    var colors = [
        '#333300',
        '#993333',
        '#003333',
        '#999933',
        '#CC0033',
        '#99CC00',
        '#000000',
        '#003399',
        '#333399',
        '#003300',
        '#CC9966',
        '#663366']
    var chartElement = document.getElementById("svg");
    var SVG_NS = 'http://www.w3.org/2000/svg';
    var XLINK_NS = 'http://www.w3.org/1999/xlink';
    var svgCache;
    var canvasCache;
    //svg绘制
    function svgDraw(data) {

        var width = 500, height = 300;
        var origin = { x: 50, y: height - 50 };
        if (svgCache) {
            svg = svgCache;
            svg.innerHTML = '';
        } else {
            var svg = document.createElementNS(SVG_NS, 'svg');
            svgCache = svg;
        }

        svg.setAttribute('width', width);
        svg.setAttribute('height', height);
        var axisX = svgCreateAxis({ from: { x: 10, y: origin.y }, to: { x: width, y: origin.y } });
        var axisY = svgCreateAxis({ from: { x: origin.x, y: height - 10 }, to: { x: origin.x, y: 0 } });
        svg.appendChild(axisX);
        svg.appendChild(axisY);
        var distanceWidth = Math.floor((width - origin.x) / (data.data.length + 1));

        var max = Math.max(...data.data);
        var heightZoom = (0.8 * origin.y) / max;
        for (let i = 0; i < data.data.length; i++) {
            const d = data.data[i];
            var rectHeight = Math.floor(d * heightZoom);
            var rect = svgCreateRect({ pos: { x: origin.x + distanceWidth * (i + 1) - 10, y: origin.y - rectHeight }, width: 20, height: rectHeight });
            svg.appendChild(rect);
        }
        return svg;
    }
    //svg坐标
    function svgCreateAxis({ from = { x: 1, y: 2 }, to = { x: 100, y: 100 }, color = 'red' }) {
        var axis = document.createElementNS(SVG_NS, 'line');
        axis.setAttribute('x1', from.x);
        axis.setAttribute('y1', from.y);
        axis.setAttribute('x2', to.x);
        axis.setAttribute('y2', to.y);
        axis.setAttribute('style', `stroke:${color};stroke-width:2`);
        return axis;
    }
    //svg柱状图
    function svgCreateRect({ pos = { x: 100, y: 100 }, width = 20, height = 100, color = 'red' }) {
        var rect = document.createElementNS(SVG_NS, 'rect');
        rect.setAttribute('x', pos.x);
        rect.setAttribute('y', pos.y);
        rect.setAttribute('width', width);
        rect.setAttribute('height', height);
        rect.setAttribute('fill', color);
        return rect;
    }
    //canvas绘制
    function canvasDraw(datas) {
        var width = 500, height = 300;
        var origin = { x: 50, y: height - 50 };
        var canvas = document.getElementById('canvas');
        canvas.width = width;
        canvas.height = height;
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, width, height);
        canvasCreateLine(context, { x: 10, y: origin.y }, { x: width, y: origin.y });
        canvasCreateLine(context, { x: origin.x, y: height - 10 }, { x: origin.x, y: 0 });
        var max = Math.max(...datas.map((d)=>{return Math.max(...d.data)}));
        for (const data of datas) {
            var distanceWidth = Math.floor((width - origin.x) / (data.data.length + 1));

            
            var heightZoom = (0.8 * origin.y) / max;
            var pos = {};
            for (let i = 0; i < data.data.length; i++) {
                const d = data.data[i];
                var rectHeight = Math.floor(d * heightZoom);
                if (i != 0) {
                    var rect = canvasCreateLine(context, pos, { x: origin.x + distanceWidth * (i + 1) - 10, y: origin.y - rectHeight },data.color);
                }

                pos.x = origin.x + distanceWidth * (i + 1) - 10;
                pos.y = origin.y - rectHeight;
                canvasCreateArc(context, pos,data.color);
            }
        }

    }
    function canvasCreateLine(context, from, to, color = 'red') {
        context.beginPath();
        context.moveTo(from.x, from.y);
        context.lineTo(to.x, to.y);
        context.lineWidth = 2;
        context.strokeStyle = color;
        context.stroke();
    }
    function canvasCreateArc(context, pos,color='red') {
        context.beginPath();
        context.arc(pos.x, pos.y, 5, 0, 2 * Math.PI);
        context.fillStyle = color;
        context.fill();
    }
    function draw(datas) {
        var tempDatas = [];
        for (let i = 0; i < datas.length; i++) {
            const data = datas[i];
            tempDatas.push({data:data.slice(2, data.length),color:colors[i]});
        }
        canvasDraw(tempDatas);


        chartElement.appendChild(svgDraw(tempDatas[0]));

    }

    // var d = svgDraw(datas.sale);
    // chartElement.appendChild(d);
    // canvasDraw(datas.sale);

    events.on('hoverRow', draw)
})();