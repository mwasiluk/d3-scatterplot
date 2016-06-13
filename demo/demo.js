var conf = {
    width: 500,
    height: 500

};
var data = [
    [1,2],
    [2,3],
    [3,4],
    [1,4]
];
var plot = new D3ScatterPlot("#scatterplot", data, conf);
plot.init();