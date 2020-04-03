/*********************************************
 ** PLOTTING CODE
 ** Imports
 ** d3
 **********************************************/

/**
*
* [Plots a whole bunch of dots defined as a "space" and highlights
certain dots. Scales the points to the width]
*
* @param {svg} svg [an svg object]
* @param {n x 2 array} space [a list of coordinates]
* @param {n x 2 array} tarSpace [a list of coordinates that will be highlighted]
* @param {string} tarColor [defines the color for the targetted points]
* @param {double} width [The width of a container]
* @param {double} height [The height of a container]
* @param {int} numTicksArr [number of ticks in the whole range.]
* @return {svg} [contains the dot space and highlighted points]
**/
function plotSpace({svg
                  , space
                  , width
                  , height
                  , numTicksArr
                  , color = ""
                  , radius = 5
                  , strokeWidth = 4
                  , tarSpace = []
                  , tarColor = "red"} = {}) {

    var scaledSpace = scaleLocSpace({space : space
                  , numTicksArr : numTicksArr
                  , height : height
                  , width : width})
    
    return (svg.selectAll(".markers")
        .data(scaledSpace)
        .enter()
        .append("circle")
        .attr("class", "markers")
        /* markers are both positive and negative.
         d[0] is the x value of each scaled coordinate.
         */
        .attr("cx", function(d) {
            // return width/2 + d[0]*width/numTicks;
            return d[0];
        })
        .attr("cy", function(d) {
            return d[1];
        })
        .attr('fill', function(d, i) {
            if (tarSpace.includes(i)) {
                return tarColor
            }
            return color
        })
        .attr('stroke', function(d, i) {
            if (tarSpace.includes(i)) {
                return tarColor
            }
        })
        .attr('stroke-width', function(d, i) {
            if (tarSpace.includes(i)) {
                return strokeWidth
            }
        })
        .attr("r", radius)
    );
}

/**
* getGridlines
* [Helper function - plotBasis
Given a domain and range, scales the axis accordingly]
*
* @param {1x2 double array} domain []
* @param {1x2 double array} range []
* @param {int} tickSize [how long to make a tick. Essentially
the tick will extend the whole length of the graph in order to
become a line.]
* @param {int} numTicks [how many ticks are in the domain of
our space.]
* @param {boolean} isX [Are we looking at the x axis or 
the y axis]
* @return {axis} [some d3 object which gets embedded in the svg.]
**/
function getGridlines({ domain, range, tickSize, numTicks, isX } = {}) {

    var scale = d3.scaleLinear()
        .domain(domain)
        .range([0, Math.abs(range)]);
    if (isX) {
        var axis = d3.axisBottom();
    } else {
        var axis = d3.axisLeft();
    }

    return axis
        .tickSize(tickSize)
        .ticks(numTicks)
        .tickFormat("")
        .tickSizeOuter(0)
        .scale(scale)
}


var linFunction = d3.line()
    .x(function(d) { return d[0]; })
    .y(function(d) { return d[1]; });

var scaleLocSpace = function({space, numTicksArr, height, width, hShift = 0, vShift = 0} = {}){
  var scaledSpace = []
  for (var i = 0; i < space.length; i++) {
    scaledSpace.push(scaleLoc({tarCoord : space[i]
                                , numTicksX : numTicksArr[0]
                                , numTicksY : numTicksArr[1]
                                , height : height
                                , width : width
                                , hShift : hShift
                                , vShift : vShift
                                }
                              ))
  }
  return(scaledSpace)
}
// hShift does a horizontal shift to all your points (this matters if you don't start at 0)
var scaleLoc = function({tarCoord, numTicksX, numTicksY = numTicksX, height, width, hShift = 0, vShift = 0} = {}) {
    if (tarCoord[0] == null) {
        return (tarCoord)
    }
    // height must be - tar coord, since 0,0 is at the top, not the bottom.
    return ([hShift + width / 2 + tarCoord[0] * width / numTicksX
          , vShift + height / 2 - tarCoord[1] * height / numTicksY])
}

// ARRAY COMPARISON

// Warn if overriding existing method
if (Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function(array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l = this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        } else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}

// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", { enumerable: false });