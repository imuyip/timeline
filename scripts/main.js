//TODO: fix tick changes
//TODO: make it respond to window resizing
//TODO: neater way to create different sections
//TODO: update orientation
//TODO: add ticks on other side of timeline axis

var svg = d3.select("#timeline")
  .append("svg")
  .attr("height","100%")
  .attr("width","100%");

var width = parseFloat(svg.style("width"))-30
  , height = parseFloat(svg.style("height"))-30;

var mindate = new Date(2014,11,16)
  , maxdate = new Date(2016,3,21);

var userOrients = ["horizontal","vertical"]
var orients=["bottom","left"];
var orient=orients[1]; 
svg.append("text")
        .text("Make me vertical")
        .attr("x", (width-150))
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "14")
        .style("font-family", "sans-serif")
        .style("fill","grey")
        .on("click", function(){
          d3.select(this).text("Make me horizontal");
          orient="left";
        })

var scale = d3.time
  .scale()
  .domain([mindate, maxdate])
  .range([30, (orient==="bottom")*width + (orient==="left")*height]);

var axis = d3.svg
  .axis()
  .scale(scale)
  .tickSize(-((orient==="bottom")*(height-30) + (orient==="left")*(width-40)))
  .ticks(5)
  .tickPadding(6)
  .orient(orient);

var axis2 = d3.svg
  .axis()
  .scale(scale)
  .tickSize(-((orient==="bottom")*(height-30) + (orient==="left")*(width-40))/3)
  .ticks(10)
  .tickPadding(10)
  .orient(orient);

var axis3 = d3.svg
  .axis()
  .scale(scale)
  .tickSize(-((orient==="bottom")*(height-30) + (orient==="left")*(width-40))*2/3)
  .ticks(10)
  .tickPadding(10)
  .orient(orient);

d3.select("svg")
  .append("g")
  .attr("class", "axis")
  .attr("transform", function() {
    return orient=="bottom" ? "translate(0," + height + ")" : "translate(60)";
  })
  .call(axis);

  d3.select("svg")
    .append("g")
    .attr("class", "axis2")
    .attr("transform", function() {
      return orient=="bottom" ? "translate(0," + height + ")" : "translate(60)";
    })
    .call(axis2);

  d3.select("svg")
    .append("g")
    .attr("class", "axis3")
    .attr("transform", function() {
      return orient=="bottom" ? "translate(0," + height + ")" : "translate(60)";
    })
    .call(axis3);

svg.append("text")
        .text("D3 timeline")
        .attr("class","title")
        .attr("x", (width-35))
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "14")
        .style("font-family", "sans-serif")
        .style("fill","grey");

var zoom = d3.behavior.zoom()
  .scaleExtent([0.3,150])
  .on("zoom", draw);

svg.call(zoom);

zoom.x(scale);

function draw() {
    svg.select("g.axis").call(axis);
}
