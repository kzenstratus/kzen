//Create the SVG Viewport


var width = 800
 , height = 800;

var svg = d3.select(".container")
                .append("svg")
                .attr("width", width + 100)
                .attr("height", height + 100);
var domain = [-5, 5]
var numTicks = 10

// function test_func(data) {
//         console.log(data);
//         return(data)
//     }

// var test4 = test_func({{ data|safe }})
// var test3 = {{data|safe}}

// Plot the 2d Dot spcae based on
// The domain and range of the space.
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



var initDotSpace = get2dDotSpace(xDomain = domain
             , yDomain = domain
             , numTicks = numTicks);

console.log(initDotSpace);

spaceGroup = svg.append('g')


plotSpace(svg = spaceGroup
          , space = initDotSpace
          , width = width
          , height = height
          , numTicks = numTicks);


// console.log(math.matrix(initDotSpace));
var transMatrix = [[1,1], [0,2]]


function getTransformSpace(space, transMatrix){
  // transform each point using math.js
  
  return math.multiply(math.matrix(space)
                       , math.matrix(transMatrix));
}


// Draw the underlying 2d grid lines.
makeBasis(svg = svg
          , xDomain = domain
          , yDomain = domain
          , width = width
          , height = height
          , numTicks = numTicks
          );

function makeBasis(svg
                   , xDomain
                   , yDomain
                   , width
                   , height
                   , numTicks
              ){



// Create scale
var xScale = d3.scaleLinear()
                  .domain(xDomain)
                  .range([0, width]);

var yScale = d3.scaleLinear()
                  .domain(yDomain)
                  .range([0, height]);

// Add scales to axis
var x_axis = d3.axisBottom()
  .ticks(numTicks)
  .scale(xScale)
  .tickFormat("")
;

var y_axis = d3.axisLeft()
  .ticks(numTicks)
  .scale(yScale)
  .tickFormat("");

// gridlines in x axis function
function make_x_gridlines() {		
    return d3.axisBottom()
      .ticks(numTicks)
      .scale(xScale)
      .tickSizeOuter(0)
}

// gridlines in y axis function
function make_y_gridlines() {		
    return d3.axisLeft()
      .ticks(numTicks)
      .scale(yScale)
      .tickSizeOuter(0)
}

//Append group and insert axis
svg.append("g")
  .attr('transform', "translate(0," + (height/2) + ")")
  .call(x_axis);
  // .call(y_axis);

svg.append("g")
  .attr('transform', "translate(" + width/2 + ",0)")
  .call(y_axis);

  
// add the X gridlines
svg.append("g")			
      .attr("class", "grid")
      .attr("transform", "translate(0," + height + ")")
      
      .call(make_x_gridlines()
          .tickSize(-height)
          .tickFormat("")
          .tickSizeOuter(0)
      );

// add the X gridlines
svg.append("g")			
      .attr("class", "grid")
      .call(make_y_gridlines()
          .tickSize(-width)
          .tickFormat("")
          .tickSizeOuter(0)
      );

}

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
