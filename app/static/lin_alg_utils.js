/*********************************************
** MATH FUNCTIONS
** Imports
** math
**********************************************/

/**
*
* [Creates a square 2d dot space]
*
* @param {int list} xDomain [2 value list representing the xDomain]
* @param {int list} yDomain [2 value list representing the yDomain]
* numTicks {int} number of 
* @return {n x 2 array} - essentially a list of coordinates. 
**/
function get2dDotSpace(xDomain, yDomain, numTicks){
  // interpolate between these two points

  var xPoints = math.range(xDomain[0]
    , xDomain[1]
    , (xDomain[1] - xDomain[0])/numTicks)._data;

  var yPoints = math.range(yDomain[0]
    , yDomain[1]
    , (yDomain[1] - yDomain[0])/numTicks)._data;
  

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

/**
*
* [Applies a transformation matrx to a given space]
*
* @param {[1,2]d double array} space [a matrix representing the original space]
* @param {[1,2]d double array} transMatrix [a transformation matrix]
* @return {[1,2]d array} - the output of the transformed space 
**/
function getTransformSpace(space, transMatrix){
  // transform each point using math.js
  return math.multiply(math.matrix(space)
                       , math.matrix(transMatrix));
}

/**
*
* [Checks if two arrays are equal. Used to compare points
which are defined as a pair of numbers, or coordinates.]
*
* @param {n double array} point [here its used to compare a coordinate]
* @param {n double array} tarPoint [here its used to compare a coordinate]
* @return {boolean} - the output of the transformed space 
**/
 function isArrayEqual(point, tarPoint){
    return point.length == tarPoint.length && point.every(function(v,i) { return v === tarPoint[i]})
}

/**
*
* [Calculates the kernel, or all the points which get mapped to zero.
This allows us to color the kernel.]
*
* @param {[1,2]d double array} space [a matrix representing the original space]
* @param {[1,2]d double array} transMatrix [a transformation matrix]
* @return {n x 2 double array} - a list of the kernel
**/
function getKernel(space, transMatrix){
  // dumb way, just look at all the space indices which end up at 0.
  var newSpace = getTransformSpace(space, transMatrix)._data;

  // wrap output space in array given dimensionality reduction cases.
  if(math.matrix(newSpace).size().length == 1){
    newSpace = [newSpace];
  }

  var kernelIndex = [];
  for (i = 0; i < newSpace.length; i ++){
      // if point is now 0, save that index.
    if (isArrayEqual(newSpace[i], [0,0])){
      kernelIndex.push(i);  
    }
  }
  
  return kernelIndex ;
}

