
// var Vector = function(coord
//                       , lineSize
//                       , lineStyle
//                       , lineColor){
//   var x = coord[0];
//   var y = coord[1];
//   var lineSize = lineSize;
//   var lineStyle = lineStyle;
//   var lineColor = lineColor;
// }

/**
 * *
 * @param {[numeric n x 1 array]} coord [represents the x,y,z ...
 * coordinates in a hilbert space ]
 * @param {[type]} lineSize  [The thickness of the line]
 * @param {[type]} lineStyle [The style of the line]
 * @param {[type]} lineColor [The color of the line]
 */
class Vector {
    constructor(startCoord
                , endCoord
                , lineSize
                , lineStyle
                , color) {
        this.startCoord = {"x" : startCoord[0], "y" : startCoord[1]};
        this.endCoord = {"x" : endCoord[0], "y" : endCoord[1]};
        this.lineSize = lineSize;
        this.lineStyle = lineStyle;
        this.arrowColor = color;
        this.dotColor = color;
        this.dotRad = 5;
        this.dotStrokeWidth = 4;
        this.linFunction = d3.line()
                              .x(function(d) { return d.x; })
                              .y(function(d) { return d.y; });

      }
        // Have a line, an arrow
        // and two points, a start and end point.

//The SVG Container
        
        getLine(someSvg){
          
          var lineData = [this.startCoord, this.endCoord];
          
          return(someSvg.append("path")
            // .attr("id", "vecLine")
            .attr("class", "vector")
            .attr("d", this.linFunction(lineData))
            .attr("stroke", this.arrowColor)
            .attr("stroke-width", this.lineSize)
            .attr("fill", "none")
            )
        }
        getArrowHead(someSvg){
          someSvg.append("svg:defs").append("svg:marker")
            .attr("id", "triangle")
            .attr("refX", 6)
            .attr("refY", 6)
            .attr("markerWidth", 30)
            .attr("markerHeight", 30)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M 0 0 12 6 0 12 3 6")
            .style("fill", this.arrowColor);
          
          d3.select("path.vector")
          .attr("marker-end", "url(#triangle)")
          return(someSvg)
        }
        getVector(someSvg){
          this.getLine(someSvg);
          // Note arrowHead needs to be called after getLine does.
          this.getArrowHead(someSvg);
          return(someSvg)
        }
        getPoint(someSvg){
          someSvg
            .selectAll(".markers")
            .data([this.startCoord])
            .enter()
            .append("circle")
            .attr("class","markers")
            .attr("cx", function(d) {return d.x;})
            .attr("cy", function(d) {return d.y;})
            .attr('fill', this.dotColor)
            .attr('stroke', this.dotColor)
            .attr('stroke-width', this.dotStrokeWidth)
            .attr("r", this.dotRad);
        }
        move(someSvg, coordList, duration){
          coordList.unshift([this.startCoord, this.endCoord]);
          var j;
          var vec = someSvg.selectAll(".vector")
          for (j = 0; j < coordList.length; j++){
            vec = vec.transition()
                    .duration(duration)
                    .attr("delay", function(d,i) {return 1000*i;})
                    .attr("d", this.linFunction(coordList[j]))
        }
      }
}

// svg.selectAll(".markers")
//    .data(this.startCoord)
//    .enter()
//    .append("circle")
//    .attr("class","markers")
//     markers are both positive and negative.
//     d[0] is the x value of each unscaled coordinate.
//     this part essentially scales the plot to a given width
//     and height.
     
//    .attr("cx", function(d) {return d.x;})
//    .attr("cy", function(d) {return d.y;})
//    .attr('fill', this.color)
//    .attr('stroke', this.color)
//    .attr('stroke-width', 4)
//    .attr("r", 5);

//var startCoord = {"x" : 1, "y": 100}

var linFunction = d3.line().x(function(d) { return d.x; })
.y(function(d) { return d.y; });

let testLine = new Vector(startCoord = [20,20], endCoord = [100,100], lineSize = 2, lineStyle = "solid" ,color = "blue");
var coordList = [[{"x" : 20, "y": 20}, {"x" : 100, "y" : 80}]
                  , [{"x" : 20, "y": 20}, {"x" : 40, "y" : 40}]]

var svgContainer = d3.select("body").append("svg:svg")
                                    .attr("width", 300)
                                    .attr("height", 300);
//testLine.getStartPoint(svgContainer)
// testLine.getPoint(svgContainer)
testLine.getVector(svgContainer);
testLine.move(svgContainer, coordList, 2000);

var vec = svgContainer.selectAll(".vector");

  for (j = 0; j < coordList.length; j++){
    vec = vec.transition()
                 .duration(duration)
                 .attr("delay", function(d,i) {return 1000*i;})
                 .attr("d", this.linFunction(coordList[j]))
  }


            .transition()
            .duration(duration)
            .attr("delay", function(d,i) {return 1000*i;})
            .attr("d", this.linFunction([{"x" : 20, "y" : 20}
                          , {"x" : 100, "y" : 80}]))
            .transition()
            .duration(duration)
            .attr("delay", function(d,i) {return 1000*i;})
            .attr("d", this.linFunction([{"x" : 20, "y" : 20}
                          , {"x" : 40, "y" : 40}]))




