// let testDisplay = new DisplayPlot({conceptId : "bessel-bias"
//   , height : 500
//   , width : 500}
//   );
// testDisplay.makeConceptExampleDiv({conceptExampleId : 'blahblah'})
// testDisplay.makeConceptExampleSvg({conceptExampleId : 'blahblah'})

class DisplayPlot {
    constructor({conceptId
                , height
                , width
                } = {}) {
      this.conceptId = conceptId; // 
      // You can have multiple concept examples underneath a conceptId
      this.height = height;
      this.width = width;
      // this.margin = {top: 20, right: 10, bottom: 20, left: 10};
      
  }
      makeConceptExampleDiv({conceptExampleId
                            } = {}
                            ){
        this.currDiv = d3.select("#" + this.conceptId)
          .append("div")
          .attr("class", "concept-example")
          .attr("id", conceptExampleId)
      }
      makeConceptExampleSvg({conceptExampleId
                                , width = this.width
                                , height = this.height
                            } = {}
                            ){
        this.currSvg = d3.select("#" + conceptExampleId)
          .append("svg")
          .attr("width", width - 10)
          .attr("height", height - 10)
          .attr("id", "#" + conceptExampleId + "Svg")
      }
}



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
 * @param {[list of jsons]} [textList] [json of the form 
 * {"frames" : numeric // this uses the duration to determine length of frame
 * , "text" : text // this can be html text
 * , "coord" : [x,y] // }]
 */
class DisplayConceptExamplePlot extends DisplayPlot{
    constructor({conceptId
                , conceptExampleId
                , buttonId = conceptExampleId + "_button"
                , xDomain
                , yDomain
                , height
                , width
                , numTicks
                , listNextDotSpaces = [] // a list of spaces
                , vecCoordJson = {}
                , textList = [] // a list of jsons of the form {"frames" : 2}
                , dotColor = 'grey'
                , tarSpace = []
                , tarColor = 'red'
                , dotRad = 5
                , dotStrokeWidth = 4
                , gridColor = 'grey'
                , duration = 4000
                } = {}) {
      super({conceptId : conceptId
              , height : height
              , width : width})

      // You can have multiple concept examples underneath a conceptId
      this.conceptExampleId = conceptExampleId; 

      this.buttonId = buttonId;
      this.buttonLabel = "Go!"
      this.buttonCssClass = "gobutton"
      this.duration = duration
      this.listNextDotSpaces = listNextDotSpaces
      
      this.makeConceptExampleDiv({conceptExampleId : conceptExampleId})
      this.makeConceptExampleSvg({conceptExampleId : conceptExampleId})
      
      this.numTicks = numTicks;

      // Make Initial Plot
      // 
      
      this.currSpace = new Space({xDomain : xDomain
                                , yDomain : yDomain
                                , height : height
                                , width : width
                                , numTicks : numTicks
                                , dotColor : dotColor
                                , tarSpace : tarSpace}
                                );

      this.vecObjList = [];
      this.vecCoordJson = vecCoordJson;
      this.caption = null;
      

  }
      makePlot(){
        this.currSpace.plotBasis({someSvg : this.currSvg})
        this.currSpace.plotSpace({someSvg : this.currSvg})
        
      }
      makeText({textList, textCoordList, colorList} = {}){
        this.caption = new Text({labelId : this.conceptExampleId + "_caption"
                               , height : this.height
                               , width : this.width
                               , numTicks : this.numTicks
                               , textList : textList
                               , coordList : textCoordList
                               , colorList : colorList
                               });
        this.caption.getText({someSvg : this.currSvg})

      }

      makeButton(){
        var currSpace = this.currSpace
        var currSvg = this.currSvg
        var caption = this.caption
        var listNextDotSpaces = this.listNextDotSpaces
        var duration = this.duration
        var vecCoordJson = this.vecCoordJson
        var vecObjList = this.vecObjList
        var svgContainer = this.currSvg;
        
        d3.select("#" + this.conceptExampleId)
          .append("button")
          .attr("class", this.buttonCssClass)
          .attr("id", this.buttonId)
          .text(this.buttonLabel)
          .on('click', function(){
            // move space
            currSpace.move({someSvg : currSvg
                            , listNextDotSpaces : listNextDotSpaces
                            , duration : duration}) 

            // add vectors
            if(Object.keys(vecCoordJson).length > 0){
              for(var i in vecObjList){
                var vecObj = vecObjList[i]
                vecObj.move(svgContainer, duration)
              }
            }
            // add text caption
            if(caption != null){
              caption.move({someSvg : svgContainer, duration : duration})  
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
        
        // var svgContainer = d3.select("#" + this.conceptExampleId)
        //                         .select("svg");
        var svgContainer = this.currSvg;

        for(var vecName in this.vecCoordJson){
          var vec = this.vecCoordJson[vecName];
          var vecCoordList = vec["coordList"]
          var startCoord = vecCoordList[0];
          
          var labels = null
          if(typeof vec['labels'] !== 'undefined'){
            labels = vec['labels']
          }
          var labelLoc = null
          if(typeof vec['labelLoc'] !== 'undefined'){
            labelLoc = vec['labelLoc']
          }
          // console.log(labels)
          let tmpVec = new Vector({startCoord : startCoord[0]
            , endCoord : startCoord[1]
            , lineSize : 2
            , lineStyle : "solid"
            , height : this.height
            , width : this.width
            , numTicks : this.numTicks
            , color : vec["color"]
            , arrowId : this.conceptExampleId + vecName
            // Vec coord list starts at index 1, don't repeat index 0.
            , coordList : vecCoordList
            , hasHead : vec["hasHead"]
            , labels : labels
            , labelLoc : labelLoc}
            // , coordList : vecCoordList.slice(1, vecCoordList.length)}
            );
      
          this.vecObjList.push(tmpVec);
          tmpVec.getVector(svgContainer);
          // if(vec["isLine"] == true){
          //   tmpVec.getLine(svgContainer);
          // }else{
          //   tmpVec.getVector(svgContainer);  
          // }
          
          tmpVec.getText(svgContainer);
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

