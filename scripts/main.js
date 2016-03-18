var svg = d3.select("#timeline").append("svg").attr("height","1000").attr("width","1000");
var mindate = new Date(2016,0,13)
  , maxdate = new Date(2016,0,14);

var scale = d3.time
  .scale()
  .domain([mindate, maxdate])
  .range([880,30]);

var axis = d3.svg
  .axis()
  .scale(scale)
  .tickSize(5)
  .ticks(10)
  .orient("left"); //control whether horizontal or vertical

d3.select("svg")
  .append("g")
  .attr("class", "axis")
  .attr("transform", "translate(100)")
  .call(axis);
