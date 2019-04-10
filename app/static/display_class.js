/* ----------------------
The Plotting Classes describe abstract notions of concepts
such as a space, or a vector. The display class grounds those classes 
to an actual DOM.
* ----------------------- */
/*********************************************
** display class
** Imports
** plot_utils.js linFunction scaleLoc
** plot_class.js Space
**********************************************/

/**
 * *
 * @param {[numeric n x 1 array]} coord [represents the x,y,z ...
 * coordinates in a hilbert space ]
 * @param {[type]} lineSize  [The thickness of the line]
 * @param {[type]} lineStyle [The style of the line]
 * @param {[type]} lineColor [The color of the line]
 */




class DisplayConceptExamplePlot {
    constructor({conceptId
                , conceptExampleId
                , buttonId
                , xDomain
                , yDomain
                , height
                , width
                , numTicks
                , listNextDotSpaces = [] // a list of spaces
                , vecCoordJson = {}
                , dotColor = 'grey'
                , tarSpace = []
                , tarColor = 'red'
                , dotRad = 5
                , dotStrokeWidth = 4
                , gridColor = 'grey'
                , duration = 4000} = {}) {
      this.conceptId = conceptId; // 
      // You can have multiple concept examples underneath a conceptId
      this.conceptExampleId = conceptExampleId; 

      this.buttonId = buttonId;
      this.buttonLabel = "Go!"
      this.buttonCssClass = "gobutton"
      this.duration = duration
      this.listNextDotSpaces = listNextDotSpaces
      this.makeConceptExampleDiv();
      this.height = height;
      this.width = width;
      this.plotSvgContainer = d3.select(conceptExampleId);
      this.numTicks = numTicks;
      // Make Initial Plot
      this.currSvg = d3.select("#" + this.conceptExampleId)
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .attr("id", "#" + this.conceptExampleId + "Svg")

      let currSpace = new Space({xDomain : xDomain
                                , yDomain : yDomain
                                , height : height
                                , width : width
                                , numTicks : numTicks
                                , dotColor : dotColor
                                , tarSpace : tarSpace}
                                );
      this.currSpace = currSpace;
      this.currSpace.plotSpace({someSvg : this.currSvg})
      this.currSpace.plotBasis({someSvg : this.currSvg})
      
      this.vecObjList = [];
      this.vecCoordJson = vecCoordJson;
      this.makeVectors();
      this.makeButton();

  }
      makeConceptExampleDiv(){
        d3.select("#" + this.conceptId)
          .append("div")
          .attr("class", "concept-example")
          .attr("id", this.conceptExampleId)
      }

      makeButton(){
        var currSpace = this.currSpace
        var currSvg = this.currSvg
        var listNextDotSpaces = this.listNextDotSpaces
        var duration = this.duration
        var vecCoordJson = this.vecCoordJson
        var vecObjList = this.vecObjList
        var svgContainer = d3.select("#" + this.conceptExampleId)
                                .select("svg");
        d3.select("#" + this.conceptExampleId)
          .append("button")
          .attr("class", this.buttonCssClass)
          .attr("id", this.buttonId)
          .text(this.buttonLabel)
          .on('click', function(){
            currSpace.move({someSvg : currSvg
                            , listNextDotSpaces : listNextDotSpaces
                            , duration : duration}) 
            if(Object.keys(vecCoordJson).length > 0){
              for(var i in vecObjList){
                var vecObj = vecObjList[i]
                vecObj.move(svgContainer, duration)
              }
            }
          }
          )
      }

      makeVectors(){
        // vecCoordJson = {"xVec" : [
        //                     [[0,0], [0, 1]]
        //                   , [[0, 0], [0, 3]]
        //                   , [[0,0], [2,4]]]
        //               , "yVec" : [[[0, 0], [3, 0]]
        //                   , [[0,0], [2,5]]]};
        this.vecObjList = []
        if(Object.keys(this.vecCoordJson).length == 0){
          return;
        }
        
        var svgContainer = d3.select("#" + this.conceptExampleId)
                                .select("svg");

        for(var vecName in this.vecCoordJson){
          var vec = this.vecCoordJson[vecName];
          console.log(this.vecCoordJson)
          var vecCoordList = vec["coordList"]
          var startCoord = vecCoordList[0];
          
          let tmpVec = new Vector({startCoord : startCoord[0]
            , endCoord : startCoord[1]
            , lineSize : 2
            , lineStyle : "solid"
            , height : this.height
            , width : this.width
            , numTicks : this.numTicks
            , color : vec["color"]
            , arrowId : vecName
            // Vec coord list starts at index 1, don't repeat index 0.
            , coordList : vecCoordList}
            // , coordList : vecCoordList.slice(1, vecCoordList.length)}
            );
      
          this.vecObjList.push(tmpVec);
          tmpVec.getVector(svgContainer);
        }
      }

      

}
// let testSpace = new Space(xDomain = [-5,5]
//   , yDomain = [-5, 5]
//   , height = 500
//   , width = 500
//   , numTicks = 10
//   , dotColor = "blue"
//   , classId = "#testId"
//   );


// var svgContainer = d3.select("body").append("svg:svg")
//                                     .attr("width", 600)
//                                     .attr("height", 600)
//                                     .attr("class", "testId");
// testSpace.plotSpace(svgContainer)
// testSpace.plotBasis(svgContainer)

// var currSpace = testSpace.space
// var nextDotSpace = getTransformSpace(currSpace, transMatrix)._data


