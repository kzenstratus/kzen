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
class DisplayDoubleConceptExamplePlot {
    constructor({
        conceptId,
        height,
        width,
        buttonId
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
    makeButton() {
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
            .on('click', function() {
                // move space
                for (var i in vecObjList) {
                    var vecObj = vecObjList[i]
                    vecObj.move(svgContainer, duration)
                }

                if (firstPlot.caption != null) {
                    firstPlot.caption.move({ someSvg: svgContainer, duration: duration })
                }

                // alert("i'm a butt")
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
            duration: 4000
        })

        this.firstPlot.currSpace.space = payload.space
        this.firstPlot.makePlot();
        this.firstPlot.makeVectors();
        this.firstPlot.makeText();
        // this.firstPlot = firstPlot
        // Plot the center line.



    }
    makeSecondPlot({ conceptExampleId, payload } = {}) {

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
            duration: 4000,
            basisType: "1_2"
        })
        this.secondPlot.currSpace.space = payload.space
        this.secondPlot.currSpace.plotBasis({ someSvg: this.secondPlot.currSvg })
        this.secondPlot.currSpace.plotSpace({ someSvg: this.secondPlot.currSvg })

        // Adding Curve
        var currSvg = this.secondPlot.currSvg
        // .append('g')

        var lineGenerator = d3.line()
            .curve(d3.curveCardinal);

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

        // var curve2 = currSvg.append('path')
        //     .data([secondPath])
        //     .attr('d', lineGenerator)
        //     .attr('fill', 'none')
        //     .attr('stroke', 'black')
        // console.log(curve)
        var circle = currSvg.append("circle")
            .attr("r", 12)
            .attr("transform", "translate(250, 480.77)");

        var lookup = [];
        var granularity = 1000;
        var l = curve.node().getTotalLength();
        for (var i = 1; i <= granularity; i++) {
            var p = curve.node().getPointAtLength(l * (i / granularity))
            lookup.push({
                x: p.x,
                y: p.y
            })
        }

        // var leftPoints = lookup.slice(0,500)
        // var rightPoints = lookup.slice(500,1000)
        // var leftPointsSecond = lookup.slice(1,500).reverse()
        // var rightPointsSecond = lookup.slice(500,1000).reverse()

        // leftPoints = leftPoints.concat(leftPointsSecond)
        // rightPoints = rightPoints.concat(rightPointsSecond)
        // lookup = rightPoints
        var xBisect = d3.bisector(function(d) { return d.x; }).left;
        // https://stackoverflow.com/questions/25655372/d3-steady-horizontal-transition-along-an-svg-path
        // 
        // function translateAlong(path) {
        //     var l = path.getTotalLength();
        //     return function(d, i, a) {
        //         return function(t) {
        //             var index = xBisect(lookup, l * t);
        //             var p = lookup[index];
        //             return "translate(" + p.x + "," + p.y + ")";
        //         };
        //     };
        // }

        // for (var curvePoint in curveAnimation) {

        //     var captionObj = curveAnimation[j]
        //     captionObj.move({ someSvg: svgContainer, duration: duration })
        // }

        transition();

        function transition() {
            circle.transition()
                .duration(10000)
                .ease(d3.easeLinear)
                // .attr("transform", translateAlong(curve.node()))
                .attrTween("transform", translateAlong({path : curve.node()}))
                // .each("end", transition);
        }

        // Returns an attrTween for translating along the specified path element.
        
        // t is time between 0 and 1
        // l is constant at 1900, unsure what it is.
        // getPointAtLength returns the point along a path.
        // / is the end of the path.
        console.log(lookup)
        function translateAlong({path} = {}) {
            var countFirst = 0;
            var countSecond = 0;
            var totalCount = 0
            var l = path.getTotalLength();
            var maxL = path.getPointAtLength(l).x;
            var minL = path.getPointAtLength(0).x;

            l = maxL-minL;
            var halfL = minL + l/2
            console.log(l)
            console.log(xBisect(lookup, 300))
            console.log(maxL)
            // console.log(path)
            return function(d, i, a) {

                return function(t) {
                    // console.log(t * maxL)
                    // var index = xBisect(lookup, maxL * t)
                    // var p = lookup[index];
                    // console.log(p)
                    // The *2 is because we aren't doubling the length, just
                    // speeding up the time it takes to travel along the path
                    // since we're essentially traveling 2x the distance.
                    if(t <= 1/4){
                      var index = xBisect(lookup, halfL + (l * t * 2))
                      var p = lookup[index];
                      // console.log(index)
                      // console.log(maxL/2 + (maxL * t))
                      // console.log(p)
                    }
                    else if(t <= 1/2){
                      var index = xBisect(lookup, maxL - (l * (t - 1/4) * 2))
                      var p = lookup[index];
                      // console.log(index)
                      // console.log(maxL/2 + (maxL * t))
                      // console.log(p)s
                    }
                    else if (t <= 3/4){
                      var index = xBisect(lookup, halfL - (l * (t - 1/2) * 2))
                      var p = lookup[index];
                    }
                    else{
                      var index = xBisect(lookup, minL + (l * (t - 3/4) * 2))
                      var p = lookup[index];
                    }

                    // console.log(index)
                    // console.log(p)              
                    return "translate(" + p.x + "," + p.y + ")";
                };



            };

        }
        return(lookup)

    }

    // moveAlongCurve({someSvg, } = {}){

    // }

}

// let testDisplay = new DisplayDoubleConceptExamplePlot({conceptId : "bessel-bias"
//   , height : 500
//   , width : 500});

// testDisplay.makeConceptExampleDiv({conceptExampleId : 'blahblah2'})
// testDisplay.makeConceptExampleSvg({conceptExampleId : 'blahblah2'})
//