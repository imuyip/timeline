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

var mindate = new Date(2014,1,1)
  , maxdate = new Date(2016,1,1);

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

var timescale = d3.time
  .scale()
  .domain([mindate, maxdate])
  .range([30, (orient==="bottom")*width + (orient==="left")*height]);

var sectSize = ((orient==="bottom")*(height-30) + (orient==="left")*(width-40));
var divisions = 3;
var bottomSectTrans = (height-30)/divisions;
var leftSectTrans = (width-40)/divisions;

var axisTicks = d3.svg
  .axis()
  .scale(timescale)
  .tickSize(-sectSize)
  .ticks(5)
  .tickPadding(12)
  .orient(orient);

var axis1 = axis2 = axis3 = d3.svg
  .axis()
  .scale(timescale)
  .tickSize(-sectSize/3)
  .orient(orient);

d3.select("svg")
  .append("g")
  .attr("class", "axis1")
  .attr("transform", function() {
  return orient=="bottom" ? "translate(0," + height + ")" : "translate(60)";
  })
  .call(axis1);

d3.select("svg")
  .append("g")
  .attr("class", "axis2")
  .attr("transform", function() {
    return orient=="bottom" ? "translate(0," + (height-bottomSectTrans) + ")" : "translate(" + (60+leftSectTrans) + ")";
  })
  .call(axis2);

d3.select("svg")
  .append("g")
  .attr("class", "axis3")
  .attr("transform", function() {
    return orient=="bottom" ? "translate(0," + (height-bottomSectTrans*2)+ ")" : "translate(" + (60+leftSectTrans*2) + ")";
  })
  .call(axis3);

d3.select("svg")
  .append("g")
  .attr("class", "axisTicks")
  .attr("transform", function() {
    return orient=="bottom" ? "translate(0," + height + ")" : "translate(60)";
  })
  .call(axisTicks);

svg.append("text")
        .text("D3 timeline")
        .attr("class","title")
        .attr("x", (width-35))
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "14")
        .style("font-family", "sans-serif");

var zoom = d3.behavior.zoom()
  .scaleExtent([0.3,150])
  .on("zoom", draw);

svg.call(zoom);

zoom.x(timescale);

function draw() {
    svg.select("g.axisTicks").call(axisTicks);
}
