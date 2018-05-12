//Create the SVG Viewport


var width = 900
 , height = 900;

var svg = d3.select(".container")
                .append("svg")
                .attr("width", width)
                .attr("height", height);
var domain = [-5, 5]
var numTicks = 10
// var transMatrix = [[1,1], [0,2]]
var transMatrix = [[1, 1], [0, 0]]

// Plot the 2d Dot spcae based on
// The domain and range of the space.


/*********************************************
* MATH FUNCTIONS
**********************************************/

function get2dDotSpace(xDomain, yDomain, numTicks){
  // interpolate between these two points
  var xPoints = getRange(xDomain[0], xDomain[1], numTicks);
  var yPoints = getRange(yDomain[0], yDomain[1], numTicks);
  
  function getRange(start, end, numBins){
    var increment = (end - start) / numBins;
    var rangeArr = [];
    for(var i = start; i <= end; i += increment){
      rangeArr.push(i);
    }
    return(rangeArr)
  }
  
  
  // Map these xPoints across all y points.
  var dotSpace = []
  for (yId = 0; yId < yPoints.length; yId ++){
    for (xId = 0; xId < xPoints.length; xId ++ ){
      dotSpace.push([yPoints[yId], xPoints[xId]]);  
    }
  }
  // console.log(dotSpace)
  return dotSpace;
}

function getTransformSpace(space, transMatrix){
  // transform each point using math.js
  
  return math.multiply(math.matrix(space)
                       , math.matrix(transMatrix));
}

function getKernel(transMatrix){
  return math.lusolve(transMatrix, [0,0]);
}

console.log(getKernel(transMatrix));
/*********************************************
* PLOTTING CODE
**********************************************/

function plotSpace(svg
                  , space
                  , width
                  , height
                  , numTicks){
  return svg.selectAll(".markers")
   .data(space)
   .enter()
   .append("circle")
   .attr("class","markers")
   .attr("cx", function(d) {
        return width/2 + d[0]*width/numTicks;
   })
   .attr("cy", function(d) {
        return height/2 + d[1]*height/numTicks;
   })
   .attr("r", 5);
}

// plotBasis helper function.
function getGridlines(domain, range, tickSize, isX) {

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


function plotBasis(svg, xDomain, yDomain, width, height, numTicks){
  var bot_axis = getGridlines(domain = xDomain, range = width, tickSize = -height, isX = true);
  var top_axis = getGridlines(domain = xDomain, range = width, tickSize = height, isX = true);
  var left_axis = getGridlines(domain = yDomain, range = height, tickSize = -width, isX = false);
  var right_axis = getGridlines(domain = yDomain, range = height, tickSize = width, isX = false);

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


var initDotSpace = get2dDotSpace(xDomain = domain
           , yDomain = domain
           , numTicks = numTicks);

// console.log(initDotSpace);


spaceGroup = svg.append('g')

// PLOT 
plotSpace(svg = spaceGroup
          , space = initDotSpace
          , width = width
          , height = height
          , numTicks = numTicks);

// Draw the underlying 2d grid lines.
plotBasis(svg = svg
          , xDomain = domain
          , yDomain = domain
          , width = width
          , height = height
          , numTicks = numTicks
          );

  



var isOriginSpace = true;
d3.select('.gobutton').on('click',function(){

  
  if(isOriginSpace){
    var nextDotSpace = getTransformSpace(space = initDotSpace
                                    , transMatrix = transMatrix)._data;
    isOriginSpace = false;
  }else{
    var nextDotSpace = initDotSpace;
    isOriginSpace = true;
  }
  
  spaceGroup.selectAll(".markers")
        .transition()
  // i is the index, d is the 
        .attr("delay", function(d,i) {
              return 1000*i;
              })
        .attr("duration", function(d,i){
              return 1000*(i+1);
              })
        .attr("cx", function(d, i) {
            return width/2 + nextDotSpace[i][0]*width/numTicks;
             })
          .attr("cy", function(d, i) {
            return width/2 + nextDotSpace[i][1]*width/numTicks;
             })
        ;
  
  
})
