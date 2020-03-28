// let testDisplay = new DisplayPlot({conceptId : "bessel-bias"
//   , height : 500
//   , width : 500}
//   );
// testDisplay.makeConceptExampleDiv({conceptExampleId : 'blahblah'})
// testDisplay.makeConceptExampleSvg({conceptExampleId : 'blahblah'})
// * @param {[string]} conceptId unique tag id for this viz
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
such as a space, or a vector. This is our Bread and Butter.
The display class grounds those classes 
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
 * @param {[string]} conceptId [Inherited from DisplayPlot]
 * @param {[string]} conceptExampleId [Unique tag id for specific example within concept]
 * @param {[string]} buttonId [Unique tag id for action button]
 * @param {[int]} height [Inherited from DisplayPlot]
 * @param {[int]} width [Inherited from DisplayPlot]
 * ----------------- SPACE PARAMETERS ----------------------------
 * @param {[[start int, end int]]} xDomain [range for 2d plot on x axis, eg. [-5,5]]
 * @param {[[start int, end int]]} yDomain [range for 2d plot on y axis, eg. [-5,5]]
 * @param {[[x int, y int]]} numTicksArr [Number of ticks in each domain eg. x,y]
 * @param {[[x int, y int]]} startSpace [N x 2 space of coordinates which display dots.]
 * @param {[[spaces]]} listNextDotSpaces [N x (N x 2) List of dot spaces that describe transformations of that space]
 * @param {[string]} dotColor [color of dots as defined in space]
 * @param {[numeric]} dotRad  [radius of each point]
 * @param {[numeric]} dotStrokeWidth  [thickness of donut aorund each point]
 * @param {[string]} gridColor [color of the grid lines]
 * @param {[string]} basisType [Which quadrants to show, 1_2_3_4 = all 4 quadrants.]
 * ---------------- Highlighted Space Parameters ------------------
 * @param {[numeric n x d array]} tarSpace  [Space to be highlighted with tarColor]
 * @param {[string]} tarColor  [color of tarSpace]
 * 
 * @param {[set of jsons]} vecCoordJson [
 * {"coordList" : [[[start x, start y], [end x, end y]]] // Describes movement of a vector
 * , "color" : [string] Describes color of vector
 * , "labels": [list string] list of text attached to vector
 * , "labelLoc": [list [x,y]] list of coords of where text will be appear relative to vector
 * , "lineColor": [string] The color of the line
 * , "lineSize": [numeric] The thickness of the line // TODO: Currently fixed at 2
 * , "lineStyle": [numeric] The style of the line
 * }
 * ] 
 * @param {[numeric]} duration  [time between transition for space, vectors and caption in ms]
 * @param {[set of jsons]} captionCoordJson [json of the form 
 * {"textList" : [string list] // Sequence of text to be displayed
 * , "textCoordList" : [[x int, y int]] // Sequence of coordinates where text will be displayed
 * , "colorList" : [string list] // Sequence of colors associated with text }]
 */
/*************************************
* Example:
*
* let testSpace = new Space(xDomain = [-5,5]
*   , yDomain = [-5, 5]
*   , height = 500
*   , width = 500
*   , numTicks = 10
*   , dotColor = "blue"
*   , classId = "#testId"
*   );*
* var svgContainer = d3.select("body").append("svg:svg")
*                                     .attr("width", 600)
*                                     .attr("height", 600)
*                                     .attr("class", "testId");
* testSpace.plotSpace(svgContainer)
* testSpace.plotBasis(svgContainer)*
* var currSpace = testSpace.space
* var nextDotSpace = getTransformSpace(currSpace, transMatrix)._data
*/

class DisplayConceptExamplePlot extends DisplayPlot{
    constructor({conceptId
                , conceptExampleId
                , buttonId = conceptExampleId + "_button"
                , xDomain
                , yDomain
                , height
                , width
                , numTicksArr
                , startSpace
                , listNextDotSpaces = [] // a list of spaces
                , dotColor = 'grey'
                , vecCoordJson = {} // list of vector names with sub nested transitions
                , captionCoordJson = {} // assumes textList, textCoordList, colorList
                , tarSpace = []
                , tarColor = 'red'
                , dotRad = 5
                , dotStrokeWidth = 4
                , gridColor = 'grey'
                , duration = 4000
                , delay = 1000
                , basisType = '1_2_3_4'
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
      this.delay = delay
      this.listNextDotSpaces = listNextDotSpaces
      
      this.makeConceptExampleDiv({conceptExampleId : conceptExampleId})
      this.makeConceptExampleSvg({conceptExampleId : conceptExampleId})
      
      this.numTicksArr = numTicksArr;

      // Make Initial Plot
      this.currSpace = new Space({xDomain : xDomain
                                , yDomain : yDomain
                                , height : height
                                , width : width
                                , numTicksArr : numTicksArr
                                , dotColor : dotColor
                                , space : startSpace
                                , tarSpace : tarSpace
                                , tarColor : tarColor
                                , dotRad : dotRad
                                , dotStrokeWidth : dotStrokeWidth
                                , gridColor : gridColor
                                , basisType : basisType}
                                );

      this.vecObjList = [];
      this.vecCoordJson = vecCoordJson;
      this.captionCoordJson = captionCoordJson;
      this.captionObjList = [];
      

  }
      makePlot(){
        this.currSpace.plotBasis({someSvg : this.currSvg})
        this.currSpace.plotSpace({someSvg : this.currSvg})
        
      }
      makeText(){
        
        this.captionObjList = []
        if(Object.keys(this.captionCoordJson).length == 0){
          return;
        }
        
        for(var captionName in this.captionCoordJson){
          
          var currCaption = this.captionCoordJson[captionName];

          var caption = new Text({labelId : this.conceptExampleId + "_" + captionName + "_caption"
                               , height : this.height
                               , width : this.width
                               , numTicksArr : this.numTicksArr
                               , textList : currCaption['textList']
                               , coordList : currCaption['textCoordList']
                               , colorList : currCaption['colorList']
                               });

          caption.getText({someSvg : this.currSvg})

          this.captionObjList.push(caption)
        }
        
      }

      makeButton(){
        var currSpace = this.currSpace
        var currSvg = this.currSvg
        var captionObjList = this.captionObjList
        var listNextDotSpaces = this.listNextDotSpaces
        var duration = this.duration
        var delay = this.delay
        var vecCoordJson = this.vecCoordJson
        var vecObjList = this.vecObjList
        var svgContainer = this.currSvg
        
        d3.select("#" + this.conceptExampleId)
          .append("button")
          .attr("class", this.buttonCssClass)
          .attr("id", this.buttonId)
          .text(this.buttonLabel)
          .on('click', function(){
            // move space
            currSpace.move({someSvg : currSvg
                            , listNextDotSpaces : listNextDotSpaces
                            , duration : duration
                            , delay : delay}) 

            // add vectors
            if(Object.keys(vecCoordJson).length > 0){
              for(var i in vecObjList){
                var vecObj = vecObjList[i]
                vecObj.move({someSvg : svgContainer
                          , duration : duration
                          , delay : delay})
              }
            }
            // add text caption
            if (Object.keys(captionObjList).length > 0){
              for(var j in captionObjList){
                var captionObj = captionObjList[j]
                captionObj.move({someSvg : svgContainer
                              , duration : duration
                              , delay : delay})
              }
            }
          }
          )
      }
      makeVectors(){
        // Ignore if no vectors are passed
        this.vecObjList = []
        if(Object.keys(this.vecCoordJson).length == 0){
          return;
        }
        
        // Create svg container to hold all vectors
        var svgContainer = this.currSvg;

        // Populate each vector
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
            , lineStyle : vec['style']
            , height : this.height
            , width : this.width
            , numTicksArr : this.numTicksArr
            , color : vec["color"]
            , arrowId : this.conceptExampleId + vecName
            // Vec coord list starts at index 1, don't repeat index 0.
            , coordList : vecCoordList
            , hasHead : vec["hasHead"]
            , labels : labels
            , labelLoc : labelLoc}
            );
      
          this.vecObjList.push(tmpVec);
          tmpVec.getVector(svgContainer);
          tmpVec.getText(svgContainer);
        }
      }
}
