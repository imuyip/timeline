var svg = d3.select("#timeline").append("svg").attr("height","1000").attr("width","1000");
var mindate = new Date(2016,0,13)
  , maxdate = new Date(2016,0,14);

var orient="left"; //control whether horizontal or vertical (bottom or left)
var scale = d3.time
  .scale()
  .domain([mindate, maxdate])
  .range([880,30]);

var axis = d3.svg
  .axis()
  .scale(scale)
  .tickSize(5)
  .ticks(10)
  .orient(orient);

d3.select("svg")
  .append("g")
  .attr("class", "axis")
  .attr("transform", function() {
    if (orient=="left") {
      return "translate(50)";
    }
    else if (orient=="bottom") {
      return "translate(0,450)";
    }
    else {
    console.log("not a valid orientation");
    };
  })
  .call(axis);
