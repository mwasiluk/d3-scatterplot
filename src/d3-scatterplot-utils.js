function D3ScatterPlotUtils(){}

// usage example deepExtend({}, objA, objB); => should work similar to $.extend(true, {}, objA, objB);
D3ScatterPlotUtils.prototype.deepExtend = function (out) {

    var utils = this;
    var emptyOut = {};


    if (!out && arguments.length > 1 && Array.isArray(arguments[1])) {
        out = [];
    }
    out = out || {};

    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        if (!source)
            continue;

        for (var key in source) {
            if (!source.hasOwnProperty(key)) {
                continue;
            }
            var isArray = Array.isArray(out[key]);
            var isObject = utils.isObject(out[key]);
            var srcObj = utils.isObject(source[key]);

            if (isObject && !isArray && srcObj) {
                utils.deepExtend(out[key], source[key]);
            } else {
                out[key] = source[key];
            }
        }
    }

    return out;
};

D3ScatterPlotUtils.prototype.isObject = function(a) {
    return a !== null && typeof a === 'object';
};
D3ScatterPlotUtils.prototype.isNumber = function(a) {
    return !isNaN(a) && typeof a === 'number';
};
D3ScatterPlotUtils.prototype.isFunction = function(a) {
    return typeof a === 'function';
};