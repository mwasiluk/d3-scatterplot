function D3ScatterPlot(placeholderSelector, data, config){
    this.utils = new D3ScatterPlotUtils();
    this.placeholderSelector = placeholderSelector;
    this.svg=null;
    this.defaultConfig = {
        width: null,
        height: null,
        margin:{
            left: 30,
            right: 30,
            top: 30,
            bottom: 30
        },
        x:{// X axis config
            label: 'X', // axis label
            value: function(d) { return d[0] }, // x value accessor
            orient: "bottom"
        },
        y:{// Y axis config
            label: 'Y', // axis label
            value: function(d) { return d[1] }, // y value accessor
            orient: "left"
        }
    };

    if(data){
        this.setData(data);
    }

    if(config){
        this.setConfig(config);
    }

}

D3ScatterPlot.prototype.setData = function (data){
    this.data = data;
    return this;
};

D3ScatterPlot.prototype.setConfig = function (config){
    this.config = this.utils.deepExtend({}, this.defaultConfig, config);
    return this;
};
D3ScatterPlot.prototype.initPlot = function (){
    var margin = this.config.margin;
    this.plot={
        x: {},
        y: {}
    };
    this.plot.width = this.config.width - margin.left - margin.right;
    this.plot.height = this.config.height - margin.top - margin.bottom;

    this.setupX();
    this.setupY();

    return this;
};

D3ScatterPlot.prototype.setupX = function (){

    var plot = this.plot;
    var x = plot.x;
    var conf = this.config.x;

    /*
     * value accessor - returns the value to encode for a given data object.
     * scale - maps value to a visual display encoding, such as a pixel position.
     * map function - maps from data value to display value
     * axis - sets up axis
     */
    x.value = conf.value;
    x.scale = d3.scale.linear().range([0, plot.width]);
    x.map = function(d) { return x.scale(x.value(d));};
    x.axis = d3.svg.axis().scale(x.scale).orient(conf.orient);
    var data = this.data;
    plot.x.scale.domain([d3.min(data, plot.x.value)-1, d3.max(data, plot.x.value)+1]);


};

D3ScatterPlot.prototype.drawPlot = function (){
    this.drawAxisX();
    this.drawAxisY();
    this.drawDots();
};

D3ScatterPlot.prototype.drawAxisX = function (){
    var self = this;
    var plot = self.plot;
    var axisConf = this.config.x;
    self.svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + plot.height + ")")
        .call(plot.x.axis)
        .append("text")
        .attr("class", "label")
        .attr("x", plot.width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text(axisConf.label);
};

D3ScatterPlot.prototype.drawAxisY = function (){
    var self = this;
    var plot = self.plot;
    var axisConf = this.config.y;
    self.svg.append("g")
        .attr("class", "y-axis")
        .call(plot.y.axis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(axisConf.label);
};

D3ScatterPlot.prototype.setupY = function (){

    var plot = this.plot;
    var y = plot.y;
    var conf = this.config.y;

    /*
     * value accessor - returns the value to encode for a given data object.
     * scale - maps value to a visual display encoding, such as a pixel position.
     * map function - maps from data value to display value
     * axis - sets up axis
     */
    y.value = conf.value;
    y.scale = d3.scale.linear().range([0, plot.height]);
    y.map = function(d) { return y.scale(y.value(d));};
    y.axis = d3.svg.axis().scale(y.scale).orient(conf.orient);


    var data = this.data;
    plot.y.scale.domain([d3.min(data, plot.y.value)-1, d3.max(data, plot.y.value)+1]);
};


D3ScatterPlot.prototype.drawDots = function (){
    var self = this;
    var plot = self.plot;
    var data = this.data;
    self.svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", plot.x.map)
        .attr("cy", plot.y.map);
        // .style("fill", function(d) { return color(cValue(d));})

};

D3ScatterPlot.prototype.initSvg = function (){
    var self = this;
    var config = this.config;

    self.svg = d3.select(self.placeholderSelector).append("svg")
        .attr("width", config.width)
        .attr("height", config.height)
        .append("g")
        .attr("transform", "translate(" + config.margin.left + "," + config.margin.top + ")");
};

D3ScatterPlot.prototype.init = function (){
    var self = this;
    self.initSvg();
    self.initPlot();
    self.drawPlot();

};

