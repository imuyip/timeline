var svg = d3.select("#timeline").append("svg").attr("height","1000").attr("width","1000");
var mindate = new Date(2016,0,13)
  , maxdate = new Date(2016,0,14);

var xScale = d3.time
  .scale()
  .domain([mindate, maxdate])
  .range([30,880]);

var xAxis = d3.svg
  .axis()
  .scale(xScale)
  .tickSize(5)
  .ticks(10)
  .orient("bottom");

d3.select("svg")
  .append("g")
  .attr("class", "axis")
  .attr("transform", "translate(0," + (300) + ")")
  .call(xAxis);
