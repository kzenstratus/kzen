/* ----------------------
Set up fake data and params for the grid
and dot spaces.
* ----------------------- */
/*********************************************
** plot class
** Imports
** plot_utils.js linFunction scaleLoc
**********************************************/



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
            .attr("cx", function(d) {return d[0];})
            .attr("cy", function(d) {return d[1];})
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


// Converts one increment to one scale

// var startCoord = {"x" : 1, "y": 10}

// scaleLoc(tarCoord = startCoord
//   , numTicks = numTicks
//   , height = height
//   , width = width);

// let testLine = new Vector(startCoord = [ 0, 0]
//   , endCoord = [1, 1]
//   , lineSize = 2
//   , lineStyle = "solid"
//   , height = 500
//   , width = 500
//   , numTicks = 10
//   , color = "blue");

// var coordList = [[[0, 0], [100, 80]]
//                   , [[0,0], [40,40]]];

// var svgContainer = d3.select("body").append("svg:svg")
//                                     .attr("width", 600)
//                                     .attr("height", 600);

// testLine.getVector(svgContainer);
// testLine.move(svgContainer, coordList, 2000);





/* ----------------------
Set up fake data and params for the grid
and dot spaces.
* ----------------------- */
/*********************************************
** Space class
** Imports
** lin_alg_utils.js get2dDotSpace
** Examples
*
let testSpace = new Space(xDomain = [-5,5]
  , yDomain = [-5, 5]
  , height = 500
  , width = 500
  , numTicks = 10
  , dotColor = "blue"
  , classId = "#testId"
  );


var svgContainer = d3.select("body").append("svg:svg")
                                    .attr("width", 600)
                                    .attr("height", 600)
                                    .attr("class", "testId");
testSpace.plotSpace(svgContainer)
testSpace.plotBasis(svgContainer)

var currSpace = testSpace.space
var nextDotSpace = getTransformSpace(currSpace, transMatrix)._data


testSpace.move(svgContainer, nextDotSpace, duration = 4000)

**********************************************/



class Space {
    constructor(xDomain
                , yDomain
                , height
                , width
                , numTicks
                , dotColor
                , tarSpace = []
                , tarColor = 'red'
                , dotRad = 5
                , dotStrokeWidth = 4
                , gridColor = 'grey'
                ) {

        this.xDomain = xDomain;
        this.yDomain = yDomain;
        this.numTicks = numTicks;
        this.height = height;
        this.width = width;
        this.dotColor = dotColor;
        this.dotSize = dotRad;
        this.gridColor = gridColor;
        this.dotRad = dotRad;
        this.dotStrokeWidth = dotStrokeWidth;
        this.tarSpace = tarSpace;
        this.tarcolor = tarColor
        this.space = get2dDotSpace(xDomain, yDomain, numTicks);
        
      }
        // Have a line, an arrow
        // and two points, a start and end point.

//The SVG Container
        
        plotBasis(someSvg){
          
          return(plotBasis(someSvg
                          , this.xDomain
                          , this.yDomain
                          , this.width
                          , this.height
                          , this.numTicks
                          )
          )}
        
        plotSpace(someSvg){
          var spaceGroup = someSvg.append('g')
          return(plotSpace(spaceGroup
                            , this.space
                            , this.width
                            , this.height
                            , this.numTicks
                            , this.dotColor
                            , this.dotRad
                            , this.dotStrokeWidth
                            , this.tarSpace
                            , this.tarColor)
          )
        }

        move(someSvg, nextDotSpace, duration){

          // display2dTransform(isOriginSpace = true
          //   , initDotSpace = this.space
          //   , transMatrix = [[1,0],[2,0]]
          //   , conceptId = this.classId
          //   , width = this.width
          //   , numTicks = this.numTicks
          //   , duration = duration
          //   )
          // d3.select(this.classId)
          someSvg.selectAll(".markers")
          .transition()
          .duration(duration)
          // i is the index, d is the 
          .attr("delay", function(d,i) {
                return 1000*i;
                })
          .attr("cx", function(d, i) {
              return this.width/2 + nextDotSpace[i][0]*this.width/this.numTicks;  
              
               })
          .attr("cy", function(d, i) {
              return this.width/2 + nextDotSpace[i][1]*this.width/this.numTicks;  
              
               })
          this.space = nextDotSpace;
        }
        moveAll(someSvg, listNextDotSpaces, duration){
          for(nextDotSpace in listNextDotSpaces){
            this.move(someSvg, nextDotSpace, duration)
          }
        }
}