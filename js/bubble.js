/*Debiste ahaber colocado 'use strict' (yo tampoco la puse)
 y debiste asegurar que el document ya hubiera cargado antes e llamar esta función. */
var myData =[
  { name: "Op. research", weg: 60, height: 0.7 },
  { name: "BI", weg: 40,  height: 0.9},
  { name: "Analytics", weg: 50, height: 0.1},
  { name: "Innovation", weg: 37, height: 0.4},
  { name: "Medicine", weg: 25, height: 0.6},  
  { name: "Logistics", weg: 20, height: 0},
]
var width = 400,
  height = 400,
  barH = 20,
  margin = {left: 20, right: 20, top: 40, bottom: 20},
  chart = d3.select("#chart")
    .append("svg")
    .attr("width", width )
    .attr("height", height)
    .append("g")
      .attr("transform", "translate("+ margin.left + "," + margin.top + ")"),
   xAxis = chart.append("g")
    .attr("class", "x axis"),
   yAxis = chart.append("g")
    .attr("class", "y axis"),
   r = 50,
   widthScale = d3.scaleLinear()
    .range([0, width - margin.left -margin.right-70]),
   colorScale = d3.scaleOrdinal(d3.schemeCategory10),
   heightScale = d3.scaleLinear()
    .range([0, height -margin.top - margin.bottom-20]);
    


function update(myData) {
  // Update the scale to the new maximum
  widthScale.domain([0, d3.max(myData, function (d) { return d.weg; })]);
  heightScale.domain([0, d3.max(myData, function (d) { return d.height; })]);

  var ps = chart.selectAll("circle")
    .data(myData);

  // Actions just for new items
  var psEnter =  ps.enter()
    .append("circle")
    .attr("r", function (d) { return d.weg*1.3; })
    .attr("cx",0);

    var text = chart.selectAll("text")
               .data(myData)
               .enter()
               .append("text");

    var textLabels = text
   .attr("x", function(d) { return d.weg*3.6; })
  .attr("y", function(d) { return d.height*360; })
  .text( function (d) { return d.name; })
   .attr("font-family", "inherit")
   .attr("font-size", "20px")
   .attr("fill", "Black");

  // Actions for new + updated
  ps.merge(psEnter) 
    .attr("cy", function (d)  { return heightScale(d.height); })
    .style("fill", function (d, i) { return colorScale(d.name); })
    .transition().duration(4000)    
    .attr('fill-opacity', 0.7)
    .attr("cx", function (d) { return widthScale(d.weg); });

  // Actions for deleted items
  ps.exit().remove();
  
  
}

/*carga de documento*/
$(document).ready(update(myData));
