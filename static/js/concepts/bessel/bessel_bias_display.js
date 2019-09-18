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
class DisplayDoubleConceptExamplePlot{
  constructor({conceptId
                , height
                , width
                , buttonId
                } = {}) {
    this.conceptId = conceptId; // 
    // You can have multiple concept examples underneath a conceptId
    this.height = height;
    this.width = width;

   // super({conceptId : conceptId
   //  , height : height
   //  , widht : width})
   this.buttonId = buttonId;
   this.buttonLabel = "Go!"
   this.buttonCssClass = "gobutton"

   
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

    d3.select("#" + this.conceptId)
      .append("button")
      .attr("class", this.buttonCssClass)
      .attr("id", this.buttonId)
      .text(this.buttonLabel)
      .on('click', function(){
        // move space
        alert("i'm a butt")
      }
      )
  }
  makeFirstPlot({conceptExampleId} = {}){
    this.firstPlot = new DisplayPlot({conceptId : this.conceptId
    , height : this.height
    , width : this.width});
    this.firstPlot.makeConceptExampleDiv({conceptExampleId : conceptExampleId})
    this.firstPlot.makeConceptExampleSvg({conceptExampleId : conceptExampleId})
    console.log(this.firstPlot.currSvg)
    // var bot_axis = getGridlines({domain : [-5,5], range : this.width
    // , tickSize : -this.height, numTicks : this.numTicks ,isX : true});
    
    // this.firstPlot.currSvg.append("g")
    //   .attr('transform', "translate(0," + (this.height/2) + ")")
    //   .call(bot_axis);
    plotBasis({svg : this.firstPlot.currSvg
              , xDomain : [-5,5]
              , yDomain : [-5,5]
              , width : this.width
              , height : this.height
              , numTicks : 10
            })
  }
  makeSecondPlot({conceptExampleId} = {}){
    this.firstPlot = new DisplayPlot({conceptId : this.conceptId
    , height : this.height
    , width : this.width});
    this.firstPlot.makeConceptExampleDiv({conceptExampleId : conceptExampleId})
    this.firstPlot.makeConceptExampleSvg({conceptExampleId : conceptExampleId})
  }

}

// let testDisplay = new DisplayDoubleConceptExamplePlot({conceptId : "bessel-bias"
//   , height : 500
//   , width : 500});

// testDisplay.makeConceptExampleDiv({conceptExampleId : 'blahblah2'})
// testDisplay.makeConceptExampleSvg({conceptExampleId : 'blahblah2'})
// 
