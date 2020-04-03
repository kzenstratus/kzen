/**
 * plotBasis
 * [Draw the underlying 2d grid lines.]
 *
 * @param {svg} svg [an svg object]
 * @param {int list} xDomain [2 value list representing the xDomain]
 * @param {int list} yDomain [2 value list representing the yDomain]
 * @param {double} width [The width of a container]
 * @param {[x int, y int]} numTicksArr [number of ticks in the whole range on each axis]
 * @return {svg} [contains the lines for the grid]
 **/
class BasisPlot {
    constructor({
        svg,
        xDomain,
        yDomain,
        width,
        height,
        numTicksArr,
        basisType = "1_2_3_4"
    } = {}) {
        this.svg = svg
        this.height = height;
        this.width = width;
        this.numTicksArr = numTicksArr;
        this.basisType = basisType
        this.xDomain = xDomain
        this.yDomain = yDomain
        this.botAxis = getGridlines({
            domain: xDomain,
            range: width,
            tickSize: -height, // use ticksize to draw gridline.
            numTicks: numTicksArr[0],
            isX: true
        });

        this.topAxis = getGridlines({
            domain: xDomain,
            range: width,
            tickSize: height,
            numTicks: numTicksArr[0],
            isX: true
        });

        this.leftAxis = getGridlines({
            domain: yDomain,
            range: height,
            tickSize: -width,
            numTicks: numTicksArr[1],
            isX: false
        });

        this.rightAxis = getGridlines({
            domain: yDomain,
            range: height,
            tickSize: width,
            numTicks: numTicksArr[1],
            isX: false
        });

        // Number line in the middle of the plot
        this.xNumLine = getGridlines({
          domain: xDomain,
          range: width,
          tickSize: -height/(100),
          numTicks: numTicksArr[0],
          isX: true
      });
    }
    makePlot() {
        var funcMap = {
            "1_2_3_4": this.make1234,
            "1_2": this.make12,
            "1_4" : this.make14,
            "xNumLine" : this.makeXNumLine
        };
        var axes = {
            "top": this.topAxis,
            "bot": this.botAxis,
            "left": this.leftAxis,
            "right": this.rightAxis,
            "xNumLine": this.xNumLine
        }
        // Execute basis Function
        // somehow I can't call a class function from another function and have the original
        // use this
        funcMap[this.basisType]({
            svg: this.svg
            ,height: this.height
            ,width : this.width
            ,numTicksArr : this.numTicksArr
            ,axes : axes
        });

        // Adjust the style of the axis
        
    }
    make1234({ svg, height, width, numTicksArr, xDomain, yDomain, axes} = {}) {

        svg.append("g")
            .attr('transform', "translate(-0.5," + (height / 2) + ")")
            .attr('tickSize')
            .call(axes["bot"]);

        svg.append("g")
            .attr('transform', "translate(-0.5," + (height / 2) + ")")
            .call(axes["top"]);

        svg.append("g")
            .attr('transform', "translate(" + width / 2 + ",-0.5)")
            .call(axes["left"]);

        svg.append("g")
            .attr('transform', "translate(" + width / 2 + ",-0.5)")
            .call(axes["right"]);
    }
    make12({ svg, height, width, numTicksArr, axes} = {}) {
        svg.append("g")
            .attr('transform', "translate(-0.5," + (height - (height / numTicksArr[1])) + ")")
            .call(axes["bot"]);

        svg.append("g")
            .attr('transform', "translate(" + width / 2 + ",-0.5)")
            .call(axes["left"]);

        svg.append("g")
            .attr('transform', "translate(" + width / 2 + ",-0.5)")
            .call(axes["right"]);
    }
    make14({ svg, height, width, numTicksArr, axes} = {}) {
        
        svg.append("g")
            .attr('transform', "translate(-0.5," + (height / 2) + ")")
            .call(axes["bot"]);

        svg.append("g")
            .attr('transform', "translate(-0.5," + (height / 2) + ")")
            .call(axes["top"]);

        svg.append("g")
            .attr('transform', "translate(" + -1 + ",-0.5)")
            .call(axes["left"]);
    }
    makeXNumLine({ svg, height, width, numTicksArr, axes} = {}) {
      // Overlay 2 vectors for thicker lines and to get an arrow.
      
      var rAxis = new Vector({startCoord : [0, 0]
        , endCoord : [numTicksArr[0] / 2 - numTicksArr[0]/50, 0]
        , lineSize : 1
        , lineStyle : 'solid'
        , height : height
        , width : width
        , numTicksArr : numTicksArr
        , color : "black"
        , arrowId : "rNumLine"
        , hasHead : true}
        );

      var lAxis = new Vector({startCoord : [0, 0]
        , endCoord : [-(numTicksArr[0] / 2), 0]
        , lineSize : 1
        , lineStyle : 'solid'
        , height : height
        , width : width
        , numTicksArr : numTicksArr
        , color : "black"
        , arrowId : "lNumLine"
        , hasHead : true}
        );
      svg.append("g")
          .attr('transform', "translate(-0.5," + (height / 2) + ")")
          .call(axes["xNumLine"]);
      rAxis.getVector(svg);
      lAxis.getVector(svg);
      
  }
}


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
  , numTicksX = numTicksX
  , numTicksY = numTicksY
  , height = height
  , width = width);

let testLine1 = new Vector({startCoord : [ 0, 0]
  , endCoord : [1, 1]
  , lineSize : 2
  , lineStyle : "solid"
  , height : 500
  , width : 500
  , numTicksX : 10
  , numTicksY : 10
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
    constructor({
        startCoord,
        endCoord,
        lineSize,
        lineStyle = "solid",
        height,
        width,
        numTicksArr,
        color,
        arrowId,
        coordList = [],
        hasHead = true,
        labels = null,
        labelLoc = null // this is relative to the head of the vec.
    } = {}) {



        this.lineSize = lineSize;
        this.lineStyle = lineStyle;
        this.arrowColor = color;
        this.dotColor = color;
        this.dotRad = 5;
        this.dotStrokeWidth = 4;
        this.height = height;
        this.width = width;
        this.arrowId = arrowId;
        this.numTicksArr = numTicksArr;
        this.coordList = coordList
        this.arrowDefId = "triangle_" + this.arrowId
        this.labelId = "label_" + this.arrowId
        this.labels = labels
        this.labelLoc = labelLoc

        this.startCoord = scaleLoc({
            tarCoord: startCoord,
            numTicksX: numTicksArr[0],
            numTicksY: numTicksArr[1],
            height: height,
            width: width
        });

        this.endCoord = scaleLoc({
            tarCoord: endCoord,
            numTicksX: numTicksArr[0],
            numTicksY: numTicksArr[1],
            height: height,
            width: width
        });

        if (labels == null) {
            this.labels = Array(coordList.length).fill("")
        }

        if (labelLoc == null) {
            this.labelLoc = Array(coordList.length).fill([7, -7])
        }
        this.hasHead = hasHead
    }
    // Have a line, an arrow
    // and two points, a start and end point.

    //The SVG Container

    getLine(someSvg) {

        var lineData = [this.startCoord, this.endCoord];
        someSvg.append("path")
            .attr("class", "vector")
            .attr("id", this.arrowId)
            .attr("d", linFunction(lineData))
            .attr("stroke", this.arrowColor)
            .attr("stroke-width", this.lineSize)
            .attr("fill", "none")
        if (this.lineStyle == 'dash'){
          d3.select("path.vector#" + this.arrowId)
            .style("stroke-dasharray", ("3, 3"))
        }
    }

    getArrowHead(someSvg) {
        // if arrow doesn't already exist, add it
        if (d3.select("path.vector#" + this.arrowId).attr("marker-end") == null) {
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
                .attr("marker-end", "url(#" + this.arrowDefId + ")")
        }

        return (someSvg)
    }
    getVector(someSvg) {
        this.getLine(someSvg);
        // Note arrowHead needs to be called after getLine does.

        if (this.endCoord[0] != null &
            this.hasHead &
            !(this.endCoord.equals(this.startCoord))
        ) {
            this.getArrowHead(someSvg);
        }

        return (someSvg)
    }
    getPoint(someSvg) {
        someSvg.selectAll(".markers")
            .data([this.startCoord])
            .enter()
            .append("circle")
            .attr("class", "markers")
            .attr("cx", function(d) { return d[0]; })
            .attr("cy", function(d) { return d[1]; })
            .attr('fill', this.dotColor)
            .attr('stroke', this.dotColor)
            .attr('stroke-width', this.dotStrokeWidth)
            .attr("r", this.dotRad);
    }
    getText(someSvg) {
        // var vecDef = someSvg.selectAll("defs").select("marker#"+ this.arrowDefId)
        var textData = []
        for (var i = 0; i < this.coordList.length; i++) {

            textData.push({
                "coord": scaleLoc({
                        tarCoord: this.coordList[i][1],
                        numTicksX: this.numTicksArr[0],
                        numTicksY: this.numTicksArr[1],
                        height: this.height,
                        width: this.width
                    }) // endCoord
                    ,
                "label": this.labels[i],
                "labelLoc": this.labelLoc[i]
            })
        }

        // TODO set text style
        // TODO fix overlap issue
        someSvg.append("text")
            .attr("class", "vecLabel")
            .attr("id", this.labelId)
            .data(textData)
            .attr("x", function(d) { return d.coord[0] + d.labelLoc[0]; })
            .attr("y", function(d) { return d.coord[1] + d.labelLoc[1]; })
            .text(function(d, i) { return d.label })
            .attr("fill", this.arrowColor)
            .attr("font-weight", "bold")
        // .style("font-size", "0.7em")


    }
    move({someSvg, duration, delay, ease = d3.easeCubic} = {}) {
        var vec = someSvg.select("path.vector#" + this.arrowId)
        var label = someSvg.select("text.vecLabel#" + this.labelId)
        var _labels = this.labels // need to define this because transition can't look outside its environment
        for (var j = 0; j < this.coordList.length; j++) {
            // This set the duration to 0 to instantly reset an animation
            // 
            var realDuration = 0;
            if (j > 0) {
                realDuration = duration
            }

            var _startCoord = scaleLoc({
                tarCoord: this.coordList[j][0],
                numTicksX: this.numTicksArr[0],
                numTicksY: this.numTicksArr[1],
                height: this.height,
                width: this.width
            })

            var _endCoord = scaleLoc({
                tarCoord: this.coordList[j][1],
                numTicksX: this.numTicksArr[0],
                numTicksY: this.numTicksArr[1],
                height: this.height,
                width: this.width
            })
            var _labelLoc = this.labelLoc[j];

            vec = vec.transition()
                .duration(realDuration)
                .ease(ease)
                .attr("delay", function(d, i) { return delay * i; })
                .attr("d", linFunction([_startCoord, _endCoord]))

            this.startCoord = _startCoord
            this.endCoord = _endCoord
            if (this.endCoord[0] != null & this.hasHead & !(this.endCoord.equals(this.startCoord))) {
                this.getArrowHead(someSvg)
            }
            label = label.transition()
                .duration(realDuration)
                .ease(ease)
                .attr("delay", function(d, i) { return delay * i; })
                .attr("x", function(d, i) { return _endCoord[0] + _labelLoc[0]; })
                .attr("y", function(d, i) { return _endCoord[1] + _labelLoc[1]; })
                .text(function(d, i) { return _labels[j] })

        }
    }
}

// d3.select("path.vector#" + arrowId).attr("marker-end")

// arrowId = "lin-combo-examplexVec"
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
    constructor({
        xDomain,
        yDomain,
        height,
        width,
        numTicksArr,
        dotColor,
        space,
        tarSpace = [],
        tarColor = 'red',
        dotRad = 5,
        dotStrokeWidth = 4,
        gridColor = 'grey',
        basisType = '1_2_3_4'
    } = {}) {

        this.xDomain = xDomain;
        this.yDomain = yDomain;
        this.numTicksArr = numTicksArr;
        this.height = height;
        this.width = width;
        this.dotColor = dotColor;
        this.dotSize = dotRad;
        this.gridColor = gridColor;
        this.dotRad = dotRad;
        this.dotStrokeWidth = dotStrokeWidth;
        this.tarSpace = tarSpace;
        this.tarcolor = tarColor
        this.space = space
        this.basisType = basisType



    }
    // Have a line, an arrow
    // and two points, a start and end point.

    //The SVG Container

    plotBasis({
        someSvg,
        basisType = this.basisType,
        basis = null
    } = {}) {
      if (basis == null) {
        var basis = new BasisPlot({
          svg: someSvg,
          xDomain: this.xDomain,
          yDomain: this.yDomain,
          width: this.width,
          height: this.height,
          numTicksArr: this.numTicksArr,
          basisType: basisType
        })
      }  
        return (basis.makePlot())
    }

    plotSpace({ someSvg } = {}) {

        var spaceGroup = someSvg.append('g')

        return (plotSpace({
            svg: spaceGroup,
            space: this.space,
            width: this.width,
            height: this.height,
            numTicksArr: this.numTicksArr,
            color: this.dotColor,
            radius: this.dotRad,
            strokeWidth: this.dotStrokeWidth,
            tarSpace: this.tarSpace,
            tarColor: this.tarColor
        }))
    }


    move({ someSvg, listNextDotSpaces
                  , duration
                  , delay
                  , ease = d3.easeCubic} = {}) {

        // TODO: why do I need to define a variable inside here
        // for d3 to see it?
        // 
        var width = this.width
        var height = this.height
        var numTicksArr = this.numTicksArr
        var currSpace = someSvg.selectAll(".markers")
        for (var i = 0; i < listNextDotSpaces.length; i++) {

            var nextDotSpace = listNextDotSpaces[i]


            for (var j = 0; j < nextDotSpace.length; j++) {
                nextDotSpace[j] = scaleLoc({
                    tarCoord: nextDotSpace[j],
                    numTicksX: this.numTicksArr[0],
                    numTicksY: this.numTicksArr[1],
                    height: this.height,
                    width: this.width
                })
            }
            currSpace = currSpace.transition()
                .duration(duration)
                .ease(ease)
                .attr("delay", function(d, i) {
                    return delay * i;
                })
                .attr("cx", function(d, i) {
                    return nextDotSpace[i][0];
                })
                .attr("cy", function(d, i) {
                    return nextDotSpace[i][1];
                })
            this.space = nextDotSpace;
        }
    }
}



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


class Text {
    constructor({
        labelId,
        height,
        width,
        numTicksArr,
        textList,
        coordList,
        colorList,
        fontWeight = "bold",
        fontSize = "20px" //"0.9em"
        ,
        fontFamily = "Roboto"
    } = {}) {

        this.labelId = labelId;
        this.numTicksArr = numTicksArr;
        this.fontWeight = fontWeight;
        this.height = height;
        this.width = width;
        this.textList = textList;
        this.coordList = coordList;
        this.colorList = colorList;
        this.fontSize = fontSize
        this.fontFamily = fontFamily

    }

    getText({ someSvg } = {}) {
        // var vecDef = someSvg.selectAll("defs").select("marker#"+ this.arrowDefId)
        var textData = []
        for (var i = 0; i < this.coordList.length; i++) {
            textData.push({
                "coord": scaleLoc({
                        tarCoord: this.coordList[i][1],
                        numTicksX: this.numTicksArr[0],
                        numTicksY: this.numTicksArr[1],
                        height: this.height,
                        width: this.width
                    }) // endCoord
                    ,
                "label": this.textList[i],
                "color": this.colorList[i]
            })
        }

        // TODO set text style
        someSvg.append("text")
            .attr("class", "caption")
            .attr("id", this.labelId)
            .data(textData)
            .attr("x", function(d) { return d.coord[0] * 1.04; })
            .attr("y", function(d) { return d.coord[1] * 0.96; })
            .text(function(d, i) { return d.label })
            .attr("fill", function(d) { return d.color })
            .attr("font-weight", this.fontWeight)
            .style("font-size", this.fontSize)
            .style("font-family", this.fontFamily)


    }

    move({ someSvg, duration, delay, ease = d3.easeCubic } = {}) {
        var currCaption = someSvg.select("text.caption#" + this.labelId)
        var textList = this.textList

        for (var j = 0; j < this.coordList.length; j++) {
            // This set the duration to 0 to instantly reset an animation
            var realDuration = 0;
            if (j > 0) {
                realDuration = duration
            }


            var _startCoord = scaleLoc({
                tarCoord: this.coordList[j][0],
                numTicksX: this.numTicksArr[0],
                numTicksY: this.numTicksArr[1],
                height: this.height,
                width: this.width
            })

            var _endCoord = scaleLoc({
                tarCoord: this.coordList[j][1],
                numTicksX: this.numTicksArr[0],
                numTicksY: this.numTicksArr[1],
                height: this.height,
                width: this.width
            })

            var _color = this.colorList[j];

            this.startCoord = _startCoord
            this.endCoord = _endCoord

            currCaption = currCaption.transition()
                .duration(realDuration)
                .ease(ease)
                .attr("delay", function(d, i) { return delay * i; })
                .attr("x", function(d, i) { return _endCoord[0] * 1.04; })
                .attr("y", function(d, i) { return _endCoord[1] * 0.96; })
                .attr("fill", function(d) { return _color })
                .text(function(d, i) { return textList[j] })

        }
    }
}