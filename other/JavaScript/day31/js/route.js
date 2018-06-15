//路由

var route=(function ($) {
    
    window.addEventListener("popstate", urlChange);
    function urlChange() {
        var dims;
        if (history.state) {
            dims = history.state;
        } else {
            dims = paramsToObj(location.href.split('?')[1]);
        }
        changeDim(dims);
        events.emit('upDim', dims);
    }
    function changeDim(dims) {
        events.emit('changeDim', dims);
    }
    function optionOnChange(dims) {
        history.pushState(null, null, location.pathname + '?' + objToParams(dims));
        changeDim(dims);
    }

    function objToParams(obj) {
        var arr = [];
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const element = obj[key];
                arr.push(`${key}=${element.join('_')}`);
            }
        }
        return arr.join('&');
    }
    function paramsToObj(params) {
        var obj = {};
        if (params) {
            
            $.each(params.split('&'), (i, v) => {
                obj[v.split('=')[0]] = v.split('=')[1].split('_').map((v, i) => {
                    return parseInt(v);
                });
            })
            
        }
        return obj;

    }

    events.on('optionOnChange', optionOnChange);
    return {
        urlChange:urlChange
    };
})(jQuery);

