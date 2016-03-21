var svg = d3.select("#timeline")
  .append("svg")
  .attr("height","100%")
  .attr("width","100%");

var width = parseFloat(svg.style("width"))-30
  , height = parseFloat(svg.style("height"))-30;

var mindate = new Date(2016,0,13)
  , maxdate = new Date(2016,0,14);

var orient="bottom"; //control whether horizontal or vertical (bottom or left)
var scale = d3.time
  .scale()
  .domain([mindate, maxdate])
  .range([30, (orient==="bottom")*width + (orient==="left")*height]);

var axis = d3.svg
  .axis()
  .scale(scale)
  .tickSize(-((orient==="bottom")*((width)*(3/5)) + (orient==="left")*(height*(6/5)))) //will fix this later
  .ticks(10)
  .tickPadding(10)
  .orient(orient);

d3.select("svg")
  .append("g")
  .attr("class", "axis")
  .attr("transform", function() {
    return orient=="bottom" ? "translate(0," + height + ")" : "translate(60)";
  })
  .call(axis)

d3.select(".domain").on("mouseover", function() { console.log("domain mouseover")});
