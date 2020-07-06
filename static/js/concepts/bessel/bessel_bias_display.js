/*********************************************
 ** display class
 ** Imports
 ** plot_utils.js linFunction scaleLoc
 ** plot_class.js Space
 **********************************************/
/**
 * 
 */
class DisplayBesselBias extends DisplayPlot{
  constructor({
    conceptId,
    height,
    width,
    buttonId,
    duration = 1000,
    delay = 0 // this ONLY WORKS WITH DELAY = 0
  } = {}) {
    // This one plot will have 2 figures in there.
    super({conceptId : conceptId
          , height : height
          , width : 1200})
    this.conceptExampleId = "bessel-bias-simple"
    this.buttonId = buttonId;
    this.buttonLabel = "Go!"
    this.buttonCssClass = "gobutton"
    this.vecObjList = []
    this.duration = duration
    this.delay = delay

    this.makeConceptExampleDiv({conceptExampleId : this.conceptExampleId})
    this.makeConceptExampleSvg({conceptExampleId : this.conceptExampleId})

  }
  makeFirstPlot({captionCoordJson, vecCoordJson} = {}) {
    let _numTicksArr = [10,10]
    let _height = 500
    let _width = 500
    
    let firstSpace = new Space({xDomain : [-5, 5]
      , yDomain : [-5, 5]
      , height : _height
      , width : _width
      , numTicksArr : _numTicksArr
      , dotColor : "black"
      , space : [[2, 0], [-2, 0]]
      , basisType : "xNumLine"
    })

    // Create Number line
    firstSpace.plotBasis({someSvg : this.currSvg})
    // Plot points
    firstSpace.plotSpace({someSvg : this.currSvg})
    // Create caption list of actions
    let captionObjList = makeText({numTicksArr : _numTicksArr
                                  , captionCoordJson : captionCoordJson
                                  , currSvg : this.currSvg // svg container to hold all vectors
                                  , height : _height
                                  , width : _width
                                  , conceptExampleId : this.conceptExampleId})
    
    // Create vectors and action sequence
    let vecObjList = makeVectors({numTicksArr : _numTicksArr
      , vecCoordJson : vecCoordJson
      , svgContainer : this.currSvg // svg container to hold all vectors
      , height : _height
      , width : _width
      , conceptExampleId : this.conceptExampleId
      , lineSize : 2})
    this.firstPlot = {vecObjList : vecObjList, captionObjList : captionObjList}
  }
      // for different tensions look at this
    // http://bl.ocks.org/valex/1c6f648d0b035c6b2f2269c56d64e696
  makeSecondPlot({space, curveFunc = d3.curveCardinal, tension = 0} = {}) {

    let _numTicksArr = [10,20]
    let _height = 500
    let _width = 500
    let _xDomain = [-5, 5]
    let _yDomain = [-5, 5]
    let _hShift = 600 // second plot starts 600 to the right
    
    // Lots of copy pasta from Space class, but this is too custom to make abstract.

    function plotSecondBasis({ svg, xDomain, yDomain, height, width, numTicksArr} = {}) {
      
      let botAxis  = getGridlines({
        domain: xDomain,
        range: width,
        tickSize: -height, // use ticksize to draw gridline.
        numTicks: numTicksArr[0],
        isX: true
    });
      let leftAxis = getGridlines({
        domain: yDomain,
        range: height,
        tickSize: -width/2,
        numTicks: numTicksArr[1],
        isX: false
    });

      let rightAxis = getGridlines({
        domain: yDomain,
        range: height,
        tickSize: width/2,
        numTicks: numTicksArr[1],
        isX: false
      });

      svg.append("g")
          .attr('transform', "translate(" + _hShift + "," + (height - (height / numTicksArr[1])) + ")")
          .call(botAxis);
      // Goes from 600 -> 1100, middle is 850
      svg.append("g")
          .attr('transform', "translate(850," + -0.5 + ")")
          .call(leftAxis);

      svg.append("g")
          .attr('transform', "translate(850," + -0.5 + ")")
          .call(rightAxis);
  }
    plotSecondBasis({svg : this.currSvg
                    , xDomain : _xDomain
                  , yDomain : _yDomain
                  , width : _width
                  , height : _height
                  , numTicksArr : _numTicksArr})

    // // Adding Curve
    let currSvg = this.currSvg
                  .append('g')

    var lineGenerator = d3.line()
                          .curve(curveFunc.tension(tension));

    var scaledCurvePoints = scaleLocSpace({
                                          space: space,
                                          numTicksArr: _numTicksArr,
                                          height: _height,
                                          width: _width,
                                          hShift : 600
                                          })
    // console.log(scaledCurvePoints)
    // console.log(lineGenerator(scaledCurvePoints))
    // This was just me messing around
    // var secondPath = scaledCurvePoints;
    // var firstPath = secondPath.splice(2,4)
    // secondPath.reverse().unshift(firstPath[0])

    var curve = currSvg.append('path')
    .data([scaledCurvePoints])
    .attr('id', "bessel_curve")
    .attr('d', lineGenerator)
    .attr('fill', 'none')
    .attr('stroke', 'black')

    this.besselVarPoint = new BesselBiasPointAlongCurve({
      curve: curve,
      startCoord: [250 + _hShift, 475],
      pointSize: 8
    })

    this.besselVarPoint.makePoint({ currSvg: currSvg })


}

  makeButton({} = {}) {
    let duration = this.duration
    // var vecCoordJson = this.vecCoordJson
    let vecObjList = this.firstPlot.vecObjList
    let firstPlot = this.firstPlot
    let svgContainer = this.currSvg
    // var svgContainer = d3.select("#" + this.conceptExampleId)
    //                         .select("svg");
    var secondPlotPoint = this.besselVarPoint
    let delay = this.delay
    d3.select("#" + this.conceptId)
        .append("button")
        .attr("class", this.buttonCssClass)
        .attr("id", this.buttonId)
        .text(this.buttonLabel)
        .on('click', function() {
            // move space
            for (let i in vecObjList) {
                let vecObj = vecObjList[i]
                vecObj.move({
                    someSvg: svgContainer,
                    duration: duration,
                    delay: delay,
                    ease: d3.easeLinear
                })
            }

            if (firstPlot.caption != null) {
                firstPlot.caption.move({ someSvg: svgContainer, duration: duration })
            }

            // make bessel var point
            secondPlotPoint.move({
                totalDuration: duration * 4, // essentially 3 vector movements
                delay: duration * 2 // takes 2 steps for arrows to move over
            });

        })
      }

}

class BesselBiasPointAlongCurve {
    constructor({
        curve, // curve is a path
        startCoord = [250, 480.77],
        pointSize = 12
      } = {}) {
        // https://stackoverflow.com/questions/25655372/d3-steady-horizontal-transition-along-an-svg-path
        this.pointSize = pointSize
        this.startCoord = startCoord
        this.curve = curve

    }
    makePoint({ currSvg } = {}) {
        this.circle = currSvg.append("circle")
            .attr("r", this.pointSize)
            .attr("transform", "translate(" + this.startCoord[0] + ", " + this.startCoord[1] + ")");

    }
    move({ totalDuration, delay, granularity = 1000 } = {}) {

        function transition({ circle, totalDuration, delay, lookup, curve } = {}) {
            console.log(delay)
            console.log(lookup)
            // circle.transition()
            //     .duration(delay)
            circle.transition()
                .duration(totalDuration)
                .delay(delay)
                .ease(d3.easeLinear)
                .attrTween("transform", translateAlong({
                    path: curve.node(),
                    lookup: lookup
                }))
            // .each("end", transition);
        }

        function translateAlong({ path, lookup } = {}) {
            var l = path.getTotalLength();
            var maxL = path.getPointAtLength(l).x;
            var minL = path.getPointAtLength(0).x;

            l = maxL - minL;
            var halfL = minL + l / 2
            // console.log(path)
            return function(d, i, a) {

                return function(t) {
                    // 
                    // The * 2 is because we aren't doubling the length, just
                    // speeding up the time it takes to travel along the path
                    // since we're essentially traveling 2x the distance.

                    if (t <= 1 / 4) {
                        var index = xBisect(lookup, halfL + (l * t * 2))
                        var p = lookup[index];
                    } else if (t <= 1 / 2) {
                        var index = xBisect(lookup, maxL - (l * (t - 1 / 4) * 2))
                        var p = lookup[index];
                    } else if (t <= 3 / 4) {
                        var index = xBisect(lookup, halfL - (l * (t - 1 / 2) * 2))
                        var p = lookup[index];
                    } else {
                        var index = xBisect(lookup, minL + (l * (t - 3 / 4) * 2))
                        var p = lookup[index];
                    }
                    // console.log(index)
                    // console.log(p)              
                    return "translate(" + p.x + "," + p.y + ")";
                };
            };
        }

        var lookup = [];

        // Returns an attrTween for translating along the specified path element.
        // t is time between 0 and 1
        // l is constant at 1900, unsure what it is.
        // getPointAtLength returns the point along a path.
        // / is the end of the path.

        var l = this.curve.node().getTotalLength();
        for (var i = 1; i <= granularity; i++) {
            var p = this.curve.node().getPointAtLength(l * (i / granularity))
            lookup.push({
                x: p.x,
                y: p.y
            })
        }


        var xBisect = d3.bisector(function(d) { return d.x; }).left;

        transition({
            circle: this.circle,
            totalDuration: totalDuration, // this is because the path length is 2x
            delay: delay,
            lookup: lookup,
            curve: this.curve
        });


    }

}
