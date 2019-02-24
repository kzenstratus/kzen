
var scaleLoc = function(tarCoord
                      , numTicks
                      , height, width){
    return({"x": width/2 + tarCoord.x * width / numTicks
          , "y" : height/2 + tarCoord.y * width / numTicks})
}

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
                , height
                , width
                , numTicks
                , color) {

        this.startCoord = scaleLoc(startCoord
                                  , numTicks
                                  , height
                                  , width );

        this.endCoord = scaleLoc(endCoord
                                  , numTicks
                                  , height
                                  , width);

        this.lineSize = lineSize;
        this.lineStyle = lineStyle;
        this.arrowColor = color;
        this.dotColor = color;
        this.dotRad = 5;
        this.dotStrokeWidth = 4;
        this.height = height;
        this.width = width;
      }
        // Have a line, an arrow
        // and two points, a start and end point.

//The SVG Container
        
        getLine(someSvg){
          
          var lineData = [this.startCoord, this.endCoord];
          

          return(someSvg.append("path")
            // .attr("id", "vecLine")
            .attr("class", "vector")
            .attr("d", linFunction(lineData))
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

          var vec = someSvg.selectAll(".vector")
          for (var j = 0; j < coordList.length; j++){
            vec = vec.transition()
                    .duration(duration)
                    .attr("delay", function(d,i) {return 1000*i;})
                    .attr("d", linFunction(coordList[j]))
        }
      }
}

// class Field {

// }

// Converts one increment to one scale

// var startCoord = {"x" : 1, "y": 10}

// scaleLoc(tarCoord = startCoord
//   , numTicks = numTicks
//   , height = height
//   , width = width);

let testLine = new Vector(startCoord = {"x" : 0, "y" : 0}
  , endCoord = {"x" : 1, "y" : 1}
  , lineSize = 2
  , lineStyle = "solid"
  , height = 500
  , width = 500
  , numTicks = 10
  , color = "blue");

var coordList = [[{"x" : 20, "y": 20}, {"x" : 100, "y" : 80}]
                  , [{"x" : 20, "y": 20}, {"x" : 40, "y" : 40}]]

var svgContainer = d3.select("body").append("svg:svg")
                                    .attr("width", 600)
                                    .attr("height", 600);

testLine.getVector(svgContainer);
// testLine.move(svgContainer, coordList, 2000);



