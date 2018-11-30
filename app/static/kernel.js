//Create the SVG Viewport

var width = 500
, height = 500;


var svg = d3.select(".concept-example")
                .append("svg")
                .attr("width", width)
                .attr("height", height);
var domain = [-5, 5]
var numTicks = 10

var transMatrix = [[1, 0], [2, 0]]

var fakeData = [[1,1], [2,2], [3,3], [4,4],
                [2,1], [3,2], [4,3],
                [1,2], [2,3], [3,4],
                [1,3], [3,1],
                [0,1], [0,2], [2,0], [1,0]]

// The above is the positive space, negate everything and 
// concat it to append the flipped version.
fakeData = fakeData.concat(math.dotMultiply(math.matrix(fakeData), -1)._data)




var initDotSpace = get2dDotSpace(xDomain = domain
           , yDomain = domain
           , numTicks = numTicks);


spaceGroup = svg.append('g')

// PLOT 
var nullSpaceId = getKernel(initDotSpace, transMatrix);

plotSpace(svg = spaceGroup
          , space = initDotSpace
          , tarSpace = nullSpaceId
          , tarColor = "red"
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



d3.select('#transform').on('click', function(){
    isOriginSpace = display2dTransform(isOriginSpace = isOriginSpace
                       , initDotSpace = initDotSpace
                       , transMatrix = transMatrix
                       , spaceGroup = spaceGroup
                       , width = width
                       , numTicks = numTicks
                       , duration = 4000)
})

// d3.select('#transpose').on('click',function(){

  
//   if(isOriginSpace){
//     var transposeTransMatrix = math.transpose(transMatrix);
//     var nextDotSpace = getTransformSpace(space = initDotSpace
//                                     , transMatrix = transposeTransMatrix)._data;
//     isOriginSpace = false;
//   }else{
//     var nextDotSpace = initDotSpace;
//     isOriginSpace = true;
//   }
  
//   spaceGroup.selectAll(".markers")
//         .transition()
//         .duration(8000)
//   // i is the index, d is the 
//         .attr("delay", function(d,i) {
//               return 1000*i;
//               })
//         // .attr("duration", function(d,i){
//         //       return 10000*(i+1);
//         //       })
//         .attr("cx", function(d, i) {
//             return width/2 + nextDotSpace[i][0]*width/numTicks;
//              })
//         .attr("cy", function(d, i) {
//             return width/2 + nextDotSpace[i][1]*width/numTicks;
//              })
//         ;
  
  
// })

