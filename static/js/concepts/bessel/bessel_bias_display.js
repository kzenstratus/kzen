/*********************************************
 ** display class
 ** Imports
 ** plot_utils.js linFunction scaleLoc
 ** plot_class.js Space
 **********************************************/
/**
 * 
 */
class DisplayDoubleConceptExamplePlot {
    constructor({
        conceptId,
        height,
        width,
        buttonId,
        duration = 8000,
        delay = 0 // this ONLY WORKS WITH DELAY = 0

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
        this.duration = duration
        this.delay = delay

    }
    makeButton() {
        var duration = this.firstPlot.duration
        // var vecCoordJson = this.vecCoordJson
        var vecObjList = this.firstPlot.vecObjList
        var firstPlot = this.firstPlot
        var svgContainer = this.firstPlot.currSvg
        // var svgContainer = d3.select("#" + this.conceptExampleId)
        //                         .select("svg");
        var secondPlotPoint = this.besselVarPoint
        var delay = this.delay

        d3.select("#" + this.conceptId)
            .append("button")
            .attr("class", this.buttonCssClass)
            .attr("id", this.buttonId)
            .text(this.buttonLabel)
            .on('click', function() {
                // move space
                for (var i in vecObjList) {
                    var vecObj = vecObjList[i]
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
                    delay: delay
                });

            })
    }
    makeFirstPlot({ conceptExampleId, payload } = {}) {
        // this.firstPlot = new DisplayPlot({conceptId : this.conceptId
        // , height : this.height
        // , width : this.width});
        // this.firstPlot.makeConceptExampleDiv({conceptExampleId : conceptExampleId})
        // this.firstPlot.makeConceptExampleSvg({conceptExampleId : conceptExampleId})

        this.firstPlot = new DisplayConceptExamplePlot({
            conceptId: this.conceptId,
            conceptExampleId: "bessel-bias-first",
            xDomain: payload.plotDomain,
            yDomain: payload.plotDomain,
            height: this.height,
            width: this.width,
            numTicksArr: payload.numTicksArr,
            dotColor: "red",
            vecCoordJson: payload.vecCoordJson,
            captionCoordJson: payload.captionCoordJson,
            duration: this.duration,
            basisType:"xNumLine"
        })
        
        this.firstPlot.currSpace.space = payload.space
        this.firstPlot.makePlot();
        this.firstPlot.makeVectors();
        this.firstPlot.makeText();
        // this.firstPlot = firstPlot
        // Plot the center line.
    }

    // for different tensions look at this
    // http://bl.ocks.org/valex/1c6f648d0b035c6b2f2269c56d64e696
    makeSecondPlot({ conceptExampleId, payload
                    , curveFunc = d3.curveCardinal
                    , tension = 0} = {}) {

        this.secondPlot = new DisplayConceptExamplePlot({
            conceptId: this.conceptId,
            conceptExampleId: "bessel-bias-second",
            xDomain: payload.plotDomain,
            yDomain: payload.plotDomain,
            height: this.height,
            width: this.width,
            numTicksArr: payload.numTicksArr,
            dotColor: "red",
            vecCoordJson: payload.vecCoordJson,
            captionCoordJson: payload.captionCoordJson,
            duration: this.duration,
            basisType: "1_2"
        })


        this.secondPlot.currSpace.space = payload.space
        this.secondPlot.currSpace.plotBasis({ someSvg: this.secondPlot.currSvg })
        // this.secondPlot.currSpace.plotSpace({ someSvg: this.secondPlot.currSvg })

        // Adding Curve
        var currSvg = this.secondPlot.currSvg
        // .append('g')

        var lineGenerator = d3.line()
            .curve(curveFunc.tension(tension));

        var scaledCurvePoints = scaleLocSpace({
            space: payload.space,
            numTicksArr: payload.numTicksArr,
            height: this.height,
            width: this.width
        })
        // console.log(scaledCurvePoints)
        // console.log(lineGenerator(scaledCurvePoints))
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
            startCoord: [250, 475],
            pointSize: 8
        })

        this.besselVarPoint.makePoint({ currSvg: currSvg })


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
            circle.transition()
                .duration(totalDuration)
                .attr("delay", function(d, i) { return delay * i; })
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
            totalDuration: totalDuration // this is because the path length is 2x
                ,
            delay: delay,
            lookup: lookup,
            curve: this.curve
        });


    }

}
