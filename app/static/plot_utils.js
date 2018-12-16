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
* @param {int} numTicks [number of ticks in the whole range.]
* @return {svg} [contains the dot space and highlighted points]
**/
function plotSpace(svg
                  , space
                  , tarSpace
                  , tarColor
                  , width
                  , height
                  , numTicks){


  return (svg.selectAll(".markers")
   .data(space)
   .enter()
   .append("circle")
   .attr("class","markers")
   /* markers are both positive and negative.
    d[0] is the x value of each unscaled coordinate.
    this part essentially scales the plot to a given width
    and height.
    */ 
   .attr("cx", function(d) {
        return width/2 + d[0]*width/numTicks;
   })
   .attr("cy", function(d) {
        return height/2 + d[1]*height/numTicks;
   })
   .attr('fill', function(d, i){
    if(tarSpace.includes(i)){
      return tarColor
    }
   })
    .attr('stroke', function(d, i){
    if(tarSpace.includes(i)){
      return tarColor
    }
   })
    .attr('stroke-width', function(d, i){
    if(tarSpace.includes(i)){
      return 4
    }
   })
   .attr("r", 5)
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
function getGridlines(domain, range, tickSize, numTicks, isX) {

  var scale = d3.scaleLinear()
                    .domain(domain)
                    .range([0, Math.abs(range)]);
  if (isX){
    var axis = d3.axisBottom();
  }else{
    var axis = d3.axisLeft();
  }

  return axis
    .tickSize(tickSize)
    .ticks(numTicks)
    .tickFormat("")
    .tickSizeOuter(0)
    .scale(scale)
}

/**
* plotBasis
* [Draw the underlying 2d grid lines.]
*
* @param {svg} svg [an svg object]
* @param {int list} xDomain [2 value list representing the xDomain]
* @param {int list} yDomain [2 value list representing the yDomain]
* @param {double} width [The width of a container]
* @param {int} numTicks [number of ticks in the whole range.]
* @return {svg} [contains the lines for the grid]
**/
var plotBasis = function (svg, xDomain, yDomain, width, height, numTicks){
  var bot_axis = getGridlines(domain = xDomain, range = width
    , tickSize = -height, numTicks = numTicks ,isX = true);

  var top_axis = getGridlines(domain = xDomain, range = width
    , tickSize = height, numTicks = numTicks, isX = true);

  var left_axis = getGridlines(domain = yDomain, range = height
    , tickSize = -width, numTicks = numTicks, isX = false);

  var right_axis = getGridlines(domain = yDomain, range = height
    , tickSize = width, numTicks = numTicks, isX = false);

  //Append group and insert axis
  svg.append("g")
    .attr('transform', "translate(0," + (height/2) + ")")
    .call(bot_axis);

  svg.append("g")
    .attr('transform', "translate(0," + (height/2) + ")")
    .call(top_axis);

  svg.append("g")
    .attr('transform', "translate(" + width/2 + ",0)")
    .call(left_axis);

  svg.append("g")
    .attr('transform', "translate(" + width/2 + ",0)")
    .call(right_axis);
}


/**
* display2dTransform
* [Function that creates the animation for the transform between
two spaces.]
*
* @param {boolean} isOriginSpace [marks the current state of the graph]
* @param {[1,2]d double array} initDotSpace [a list of coordinates]
* @param {[1,2]d double array} transMatrix [matrix used to perform a linear transformation]
* @param {svg} spaceGroup [essentially an empty svg group]
* @param {double} width [The width of a container]
* @param {int} numTicks [number of ticks in the whole range.]
* @param {int} duration [the time in milliseconds for the transition to happen.]
* @return {boolean} [returns the updated state of if origin space or not.]
**/
function display2dTransform(isOriginSpace
                            , initDotSpace
                            , transMatrix
                            , conceptId
                            , width
                            , numTicks
                            , duration){
    console.log("display");
  console.log(isOriginSpace)
  console.log(initDotSpace)
  console.log(transMatrix)
  console.log(conceptId)
  console.log(width)
  console.log(numTicks)
  console.log(duration)
  if(isOriginSpace){
    var nextDotSpace = getTransformSpace(space = initDotSpace
                                    , transMatrix = transMatrix)._data;
    isOriginSpace = false;
  }else{
    var nextDotSpace = initDotSpace;
    isOriginSpace = true;
  }
  console.log("test1")
  console.log(nextDotSpace[-5]);
  console.log("test2")
  d3.select(conceptId).selectAll(".markers")
        .transition()
        .duration(duration)
        // i is the index, d is the 
        .attr("delay", function(d,i) {
              return 1000*i;
              })
        .attr("cx", function(d, i) {
            console.log("cx", d, i)
            // console.log(nextDotSpace[i][0])
            if(i < 120){
              return width/2 + nextDotSpace[i][0]*width/numTicks;  
            }
            
             })
        .attr("cy", function(d, i) {
            // console.log("cy")
            // console.log(nextDotSpace[i][1])
            if(i < 120){
              return width/2 + nextDotSpace[i][1]*width/numTicks;  
            }
            
             })
  console.log(isOriginSpace)
  return(isOriginSpace);

}

// var test = function(svg){

//   console.log(svg);

//   svg.append("g");

//   return(svg);
// }

// class User {

//   constructor(conceptId
//         , buttonId
//         , initDotSpace
//         , highlightSpace
//         , domain
//         , width
//         , height
//         , numTicks
//         , transMatrix
//         , duration
//         , tarColor) {
//     // invokes the setter
//   this._conceptId = conceptId;
//   this._buttonId = buttonId;
//   this._initDotSpace = initDotSpace;
//   this._highlightSpace = highlightSpace;
//   this._domain = domain;
//   this._width = width;
//   this._height = height;
//   this._numTicks = numTicks;
//   this._transMatrix = transMatrix;
//   this._duration = duration;
//   this._tarColor = tarColor;
//   this._isOriginSpace = false;
//   this._svg = d3.select(conceptId)
//             .append("svg")
//             .attr("width", width)
//             .attr("height", height)

//   this._spaceGroup = this._svg.append('g')

//   // Can't explicitely name the paremeters somehow ???
//   // have to rely on order ... :(
//   plotBasis(this._svg
//             , this._domain
//             , this._domain
//             , this._width
//             , this._height
//             , this._numTicks
//             );

//   plotSpace(this._spaceGroup
//             , this._initDotSpace
//             , this._highlightSpace
//             , this._tarColor
//             , this._width
//             , this._height
//             , this._numTicks);
//   }
//   animate(){
//       d3.select(buttonId).on('click', function(){
//       this._isOriginSpace = display2dTransform(
//                     this._isOriginSpace
//                    , this._initDotSpace
//                    , this._transMatrix
//                    , this._conceptId
//                    , this._width
//                    , this._numTicks
//                    , this._duration)
//                    })
//   }
// }

var DisplayTransConceptPlot = function (conceptId
                            , buttonId
                            , initDotSpace
                            , highlightSpace
                            , domain
                            , width
                            , height
                            , numTicks
                            , transMatrix
                            , duration
                            , tarColor
                            ){
  this._conceptId = conceptId;
  this._buttonId = buttonId;
  this._initDotSpace = initDotSpace;
  this._highlightSpace = highlightSpace;
  this._domain = domain;
  this._width = width;
  this._height = height;
  this._numTicks = numTicks;
  this._transMatrix = transMatrix;
  this._duration = duration;
  this._tarColor = tarColor;
  var _isOriginSpace = true
  var svg = d3.select(conceptId)
            .append("svg")
            .attr("width", width)
            .attr("height", height)

  var spaceGroup = svg.append('g')

  this.wtf = getTransformSpace(space = initDotSpace
                                    , transMatrix = transMatrix)._data;

  // Draw the underlying 2d grid lines.
  plotBasis(svg
            , domain
            , domain
            , width
            , height
            , numTicks
            );
  plotSpace(spaceGroup
            , initDotSpace
            , highlightSpace
            , tarColor
            , width
            , height
            , numTicks);
    
    d3.select(buttonId)
      // .datum({
      //   "isOriginSpace2" : this._isOriginSpace,
      //   "initDotSpace" : this._initDotSpace
      // })
      .on('click', function(){
            // var _isOriginSpace = _isOriginSpace ? true : false
            console.log("hello")
            console.log(_isOriginSpace)
            console.log("bye")
            _isOriginSpace = display2dTransform(
                  _isOriginSpace
                   , initDotSpace
                   , transMatrix
                   , conceptId
                   , width
                   , numTicks
                   , duration)
            console.log("bye2")
            console.log(_isOriginSpace);
          })
  // d3.select(buttonId).on('click', function(){
  //           this._isOriginSpace = display2dTransform(
  //                 isOriginSpace = this._isOriginSpace
  //                  , initDotSpace = initDotSpace
  //                  , transMatrix = transMatrix
  //                  , conceptId = conceptId
  //                  , width = width
  //                  , numTicks = numTicks
  //                  , duration = duration)
  //         })

  // return {
  //   conceptId : this._conceptId
  //         , buttonId : this._buttonId
  //         , initDotSpace : this._initDotSpace
  //         , highlightSpace : this._highlightSpace
  //         , domain : this._domain
  //         , width : this._width
  //         , height : this._height
  //         , numTicks: this._numTicks
  //         , transMatrix : this._transMatrix
  //         , duration : this._duration
  //         // , tarColor : this._tarColor
  //         , isOriginSpace : isOriginSpace
  //         , animate : d3.select(buttonId).on('click', function(){
  //           isOriginSpace = display2dTransform(
  //                 isOriginSpace = isOriginSpace
  //                  , initDotSpace = initDotSpace
  //                  , transMatrix = transMatrix
  //                  , conceptId = conceptId
  //                  , width = width
  //                  , numTicks = numTicks
  //                  , duration = duration)
  //         })
  // }
}





