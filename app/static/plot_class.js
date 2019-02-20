
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
        this.startColor = color;
        this.endColor = color;
      }
        // Have a line, an arrow
        // and two points, a start and end point.

//The SVG Container
        getLine(someSvg){
          var linFunction = d3.line()
                              .x(function(d) { return d.x; })
                              .y(function(d) { return d.y; });
          var lineData = [this.startCoord, this.endCoord];
          
          return(someSvg.append("path")
            .attr("d", linFunction(lineData))
            .attr("stroke", this.arrowColor)
            .attr("stroke-width", this.lineSize)
            .attr("fill", "none")
            .attr("marker-end", "url(#triangle)")
            )
        }
        getArrowHead(someSvg){
          return(
            someSvg.append("svg:defs").append("svg:marker")
            .attr("id", "triangle")
            .attr("refX", 6)
            .attr("refY", 6)
            .attr("markerWidth", 30)
            .attr("markerHeight", 30)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M 0 0 12 6 0 12 3 6")
            .style("fill", this.arrowColor))

        }
        getArrow(someSvg){
          this.getArrowHead(someSvg);
          this.getLine(someSvg);
          return(someSvg)
        }
        // getStartPoint(someSvg){
        //   someSvg
        //   .append("circle")
        //   .attr("class","markers")

        //   return();
        // }
        // move(){
        // }
}


let testLine = new Vector(startCoord = [1,5], endCoord = [100,100], lineSize = 2, lineStyle = "solid" ,color = "blue");

var svgContainer = d3.select("body").append("svg:svg")
                                    .attr("width", 300)
                                    .attr("height", 300);
testLine.getArrow(svgContainer)
// Vehicle.getColor(car); // "purple"






