/* ----------------------
Set up fake data and params for the grid
and dot spaces.
* ----------------------- */
/*********************************************
** plot class
** Imports
** plot_utils.js linFunction scaleLoc
var startCoord = {"x" : 1, "y": 10}

scaleLoc(tarCoord = startCoord
  , numTicks = numTicks
  , height = height
  , width = width);

let testLine1 = new Vector({startCoord : [ 0, 0]
  , endCoord : [1, 1]
  , lineSize : 2
  , lineStyle : "solid"
  , height : 500
  , width : 500
  , numTicks : 10
  , color : "blue"});

var coordList = [[[0, 0], [100, 80]]
                  , [[0,0], [40,40]]];

var svgContainer = d3.select("body").append("svg:svg")
                                    .attr("width", 600)
                                    .attr("height", 600);

testLine.getVector(svgContainer);
testLine.move(svgContainer, coordList, 2000);
**********************************************/

/**
 * *
 * @param {[numeric n x 1 array]} coord [represents the x,y,z ...
 * coordinates in a hilbert space ]
 * @param {[type]} lineSize  [The thickness of the line]
 * @param {[type]} lineStyle [The style of the line]
 * @param {[type]} lineColor [The color of the line]
 */
class Vector {
    constructor({startCoord
                , endCoord
                , lineSize
                , lineStyle
                , height
                , width
                , numTicks
                , color
                , arrowId
                , coordList = []
                , label = ""} = {}) {

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
        this.arrowId = arrowId;
        this.numTicks = numTicks;
        this.coordList = coordList
        this.label = label

      }
        // Have a line, an arrow
        // and two points, a start and end point.

//The SVG Container
        
        getLine(someSvg){
          
          var lineData = [this.startCoord, this.endCoord];
          
          return(someSvg.append("path")
            // .attr("id", "vecLine")
            .attr("class", "vector")
            .attr("id", this.arrowId)
            .attr("d", linFunction(lineData))
            .attr("stroke", this.arrowColor)
            .attr("stroke-width", this.lineSize)
            .attr("fill", "none")
            )
        }

        getArrowHead(someSvg){
          someSvg.append("svg:defs").append("svg:marker")
            .attr("id", "triangle_" + this.arrowId)
            .attr("refX", 12)
            .attr("refY", 6)
            .attr("markerWidth", 30)
            .attr("markerHeight", 30)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M 0 0 12 6 0 12 3 6")
            .style("fill", this.arrowColor);
          
          d3.select("path.vector#" + this.arrowId)
          .attr("marker-end", "url(#triangle_" + this.arrowId + ")")
          return(someSvg)
        }
        getVector(someSvg){
          this.getLine(someSvg);
          // Note arrowHead needs to be called after getLine does.
          this.getArrowHead(someSvg);
          return(someSvg)
        }
        getPoint(someSvg){
          someSvg.selectAll(".markers")
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
        getText(someSvg){
          var vecDef = someSvg.selectAll("defs").select("marker#triangle_"+ this.arrowId)
          // Somehow this gets cut off, so text can't be too long.
          vecDef.append("text")
                .attr("x", 13) // 13 because 12 is the end of the arrow
                .attr("dy", "1em")
                .style("font-size", "0.7em")
                .text(this.label)

        }
        move(someSvg, duration){

          var vec = someSvg.select("path.vector#" + this.arrowId)
          for (var j = 0; j < this.coordList.length; j++){
            // This set the duration to 0 to instantly reset an animation
            // 
            var realDuration = 0;
            if(j > 0){
              realDuration = duration
            }
            var _startCoord = scaleLoc(this.coordList[j][0]
                                       , this.numTicks
                                       , this.height
                                       , this.width)
            var _endCoord = scaleLoc(this.coordList[j][1]
                                     , this.numTicks
                                     , this.height
                                     , this.width)
            vec = vec.transition()
                    .duration(realDuration)
                    .attr("delay", function(d,i) {return 1000*i;})
                    .attr("d", linFunction([_startCoord, _endCoord]))
        }
      }
}


// var someSvg = d3.select("#basis-example-ortho").select("svg");

// vecDef = someSvg.selectAll("defs").select("marker#triangle_basis-example-orthoxVec")

// Converts one increment to one scale






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
let testSpace = new Space({xDomain : [-5,5]
  , yDomain : [-5, 5]
  , height : 500
  , width : 500
  , numTicks : 10
  , dotColor : "blue"
  , classId : "#testId"}


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
    constructor({xDomain
                , yDomain
                , height
                , width
                , numTicks
                , dotColor
                , tarSpace = []
                , tarColor = 'red'
                , dotRad = 5
                , dotStrokeWidth = 4
                , gridColor = 'grey'} = {}
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
        
        plotBasis({someSvg} = {}){
          
          return(plotBasis(someSvg
                          , this.xDomain
                          , this.yDomain
                          , this.width
                          , this.height
                          , this.numTicks
                          )
          )}
        
        plotSpace({someSvg} = {}){
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


        move({someSvg, listNextDotSpaces, duration} = {}){

          // TODO: why do I need to define a variable inside here
          // for d3 to see it?
          // 
          var width = this.width
          var height = this.height
          var numTicks = this.numTicks
          // console.log(numTicks)
          
          var currSpace = someSvg.selectAll(".markers")
          for(var i = 0; i < listNextDotSpaces.length; i ++ ){
            var nextDotSpace = listNextDotSpaces[i]
            currSpace = currSpace.transition()
                                   .duration(4000)
                                   .attr("delay", function(d,i) {
                                           return 1000*i;
                                           })
                                   .attr("cx", function(d, i) {
                                         return width/2 + nextDotSpace[i][0] * width/numTicks;  
                                         
                                          })
                                   .attr("cy", function(d, i) {
                                         return height/2 + nextDotSpace[i][1]* height/numTicks;  
                                         
                                           })
            this.space = nextDotSpace;  
          }
        }
}
