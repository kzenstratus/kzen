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
   this.vecObjList = []
   
  }
  makeButton(){
    var duration = this.firstPlot.duration
    // var vecCoordJson = this.vecCoordJson
    var vecObjList = this.firstPlot.vecObjList
    var firstPlot = this.firstPlot
    var svgContainer = this.firstPlot.currSvg
    // var svgContainer = d3.select("#" + this.conceptExampleId)
    //                         .select("svg");

    d3.select("#" + this.conceptId)
      .append("button")
      .attr("class", this.buttonCssClass)
      .attr("id", this.buttonId)
      .text(this.buttonLabel)
      .on('click', function(){
        // move space
        for(var i in vecObjList){
                var vecObj = vecObjList[i]
                vecObj.move(svgContainer, duration)
            }

        if(firstPlot.caption != null){
              firstPlot.caption.move({someSvg : svgContainer, duration : duration})  
            }

        // alert("i'm a butt")
      }
      )
  }
  makeFirstPlot({conceptExampleId, payload} = {}){
    // this.firstPlot = new DisplayPlot({conceptId : this.conceptId
    // , height : this.height
    // , width : this.width});
    // this.firstPlot.makeConceptExampleDiv({conceptExampleId : conceptExampleId})
    // this.firstPlot.makeConceptExampleSvg({conceptExampleId : conceptExampleId})
    
    this.firstPlot = new DisplayConceptExamplePlot({conceptId : this.conceptId
                , conceptExampleId : "bessel-bias-first"
                , xDomain : payload.plotDomain
                , yDomain : payload.plotDomain
                , height : this.height
                , width : this.width
                , numTicksArr : payload.numTicksArr
                , dotColor : "red"
                , vecCoordJson: payload.vecCoordJson
                , captionCoordJson: payload.captionCoordJson
                , duration: 4000
              })

    this.firstPlot.currSpace.space = payload.space
    this.firstPlot.makePlot();
    this.firstPlot.makeVectors();
    this.firstPlot.makeText();
    // this.firstPlot = firstPlot
    // Plot the center line.



  }
  makeSecondPlot({conceptExampleId, payload} = {}){

    this.secondPlot = new DisplayConceptExamplePlot({conceptId : this.conceptId
                , conceptExampleId : "bessel-bias-second"
                , xDomain : payload.plotDomain
                , yDomain : payload.plotDomain
                , height : this.height
                , width : this.width
                , numTicksArr : payload.numTicksArr
                , dotColor : "red"
                , vecCoordJson: payload.vecCoordJson
                , captionCoordJson: payload.captionCoordJson
                , duration: 4000
                , basisType : "1_2"
              })
    this.secondPlot.currSpace.space = payload.space
    this.secondPlot.currSpace.plotBasis({someSvg: this.secondPlot.currSvg})
    this.secondPlot.currSpace.plotSpace({someSvg: this.secondPlot.currSvg})
    // this.secondPlot.makePlot();
    // this.secondPlot.makeVectors();
    // this.secondPlot.makeText();
    
  }

}

// let testDisplay = new DisplayDoubleConceptExamplePlot({conceptId : "bessel-bias"
//   , height : 500
//   , width : 500});

// testDisplay.makeConceptExampleDiv({conceptExampleId : 'blahblah2'})
// testDisplay.makeConceptExampleSvg({conceptExampleId : 'blahblah2'})
// 
