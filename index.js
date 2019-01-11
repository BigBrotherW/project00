
const api2 ='https://api.iextrading.com/1.0/stock/aapl/chart/1y';


document.addEventListener("DOMContentLoaded", function(event) {
fetch(api2)
    .then(function(response) { return response.json(); })
    .then(function(data) {

        var parsedData = parseData(data).slice(data.length-301,data.length-1);
        drawChart(parsedData);
        //  console.log('parsedData',parsedData);
    })
    .catch(function(err) { console.log(err); })
});

/**
 * Parse data into key-value pairs
 * @param {object} data
 */
function parseData(data) {
    var arr = [];
    for (var i in data) {
        // console.log('i',i);
        arr.push({
            date: Date.parse(new Date(data[i].date) ), //date
            value: data[i].close 
        });
    }
    return arr;
}

/**
 * Creates a chart using D3
 * @param {object} data 
 */
function drawChart(data) {
var svgWidth = 600, svgHeight = 400;
var margin = { top: 20, right: 20, bottom: 30, left: 50 };
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
var height2 = svgHeight- margin.top- margin.top- margin.top;

var svg = d3.select('#svg3')
    .attr("width", svgWidth)
    .attr("height", svgHeight);
    
var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleTime()
    .rangeRound([0, width]);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var line = d3.line()
    .x(function(d) { return x(d.date)})
    .y(function(d) { return y(d.value)})
    x.domain(d3.extent(data, function(d) { console.log('x domain data',d.date);return d.date }));
    
    y.domain(d3.extent(data, function(d) { return d.value }));

g.append("g")
    .attr("transform", "translate(0," + height + ")")
    
   
    .style("font-size","1em")
    .call(d3.axisBottom(x))
    ;
    
    // .select(".domain")
    //.remove();

g.append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Price ($)");

g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 2.5)
    .attr("d", line);
}
