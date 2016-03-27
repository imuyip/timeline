//TODO: fix tick changes
//TODO: fix zoom scale on resize
//TODO: tidy up

var svg = d3.select("#timeline")
  .append("svg")
  .attr("height","100%")
  .attr("width","100%");

var width = parseFloat(svg.style("width"))-70
  , height = parseFloat(svg.style("height"))-30;

var mindate = new Date(2014,1,1)
  , maxdate = new Date(2016,1,1);

var userOrients = ["horizontal","vertical"]
var orients=["bottom","left"];
var choice = 0;
var orient=orients[choice];

var orientText = svg.append("text")
        .text("Make me " + userOrients[1-choice] )
        .attr("x", (width-110))
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "14")
        .style("font-family", "sans-serif")
        .style("fill","grey")
        .on("click", reOrient);

var timescale = d3.time
  .scale()
  .domain([mindate, maxdate])
  .range([30, (orient==="bottom")*width + (orient==="left")*height]);

var sectSize = ((orient==="bottom")*(height-30) + (orient==="left")*(width-30));
var divisions = 3;
var bottomSectTrans = (height-30)/divisions;
var leftSectTrans = (width-30)/divisions;

var axisTicks = d3.svg
  .axis()
  .scale(timescale)
  .tickSize(-sectSize)
  .outerTickSize(0)
  .ticks(5)
  .tickPadding(12)
  .orient(orient);

var axisTicksSmall = d3.svg
  .axis()
  .scale(timescale)
  .tickSize(10)
  .outerTickSize(0)
  .ticks(5)
  .tickPadding(6)
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
  return orient=="bottom" ? "translate(40," + height + ")" : "translate(70)";
  })
  .call(axis1);

d3.select("svg")
  .append("g")
  .attr("class", "axis2")
  .attr("transform", function() {
    return orient=="bottom" ? "translate(40," + (height-bottomSectTrans) + ")" : "translate(" + (70+leftSectTrans) + ")";
  })
  .call(axis2);

d3.select("svg")
  .append("g")
  .attr("class", "axis3")
  .attr("transform", function() {
    return orient=="bottom" ? "translate(40," + (height-bottomSectTrans*2)+ ")" : "translate(" + (70+leftSectTrans*2) + ")";
  })
  .call(axis3);

d3.select("svg")
  .append("g")
  .attr("class", "axisTicks")
  .attr("transform", function() {
    return orient=="bottom" ? "translate(40," + height + ")" : "translate(70)";
  })
  .call(axisTicks);

d3.select("svg")
  .append("g")
  .attr("class", "axisTicksSmall")
  .attr("transform", function() {
    return orient=="bottom" ? "translate(40," + (height) + ")" : "translate(70)";
  })
  .call(axisTicksSmall);

var title = svg.append("text")
        .text("D3 timeline")
        .attr("class","title")
        .attr("x", (width+5))
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
    svg.select("g.axisTicksSmall").call(axisTicksSmall);
}

resize();
 d3.select(window).on("resize", resize);

 function resize() {
      svg.attr("height","100%").attr("width", "100%");
      width = parseFloat(svg.style("width"))-70;
      height = parseFloat(svg.style("height"))-30;
      orientText.attr("x", (width-110));
      timescale.range([30, (orient==="bottom")*width + (orient==="left")*height]);
      sectSize = ((orient==="bottom")*(height-30) + (orient==="left")*(width-30));
      bottomSectTrans = (height-30)/divisions;
      leftSectTrans = (width-30)/divisions;
      axisTicks.tickSize(-sectSize);
      axisTicks.outerTickSize(0);
      axis1.tickSize(-sectSize/3);
      axis2.tickSize(-sectSize/3);
      axis3.tickSize(-sectSize/3);
      d3.select(".axis1")
        .attr("transform", function() {
        return orient=="bottom" ? "translate(40," + height + ")" : "translate(70)";
        })
        .call(axis1);
      d3.select(".axis2")
        .attr("transform", function() {
          return orient=="bottom" ? "translate(40," + (height-bottomSectTrans) + ")" : "translate(" + (70+leftSectTrans) + ")";
        })
        .call(axis2);

      d3.select(".axis3")
        .attr("transform", function() {
          return orient=="bottom" ? "translate(40," + (height-bottomSectTrans*2)+ ")" : "translate(" + (70+leftSectTrans*2) + ")";
        })
        .call(axis3);

      d3.select(".axisTicks")
        .attr("transform", function() {
          return orient=="bottom" ? "translate(40," + height + ")" : "translate(70)";
        })
        .call(axisTicks);
        d3.select(".axisTicksSmall")
          .attr("transform", function() {
            return orient=="bottom" ? "translate(40," + (height) + ")" : "translate(70)";
          })
          .call(axisTicksSmall);

      title.attr("x", (width+5))
              .attr("y", 20);

      zoom.on("zoom", draw);

      svg.call(zoom);

      zoom.x(timescale);

      function draw() {
          svg.select("g.axisTicks").call(axisTicks);
          svg.select("g.axisTicksSmall").call(axisTicksSmall);
      }
   }

   function reOrient() {
        choice = 1 - choice;
        orient=orients[choice];
        orientText.text("Make me " + userOrients[1-choice] );
        axisTicks.orient(orient);
        axisTicksSmall.orient(orient);
        axis1.orient(orient);
        axis2.orient(orient);
        axis3.orient(orient);
        resize();
     }
