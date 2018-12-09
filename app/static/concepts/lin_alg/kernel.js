/*********************************************
** Kernel Concept
** Imports
** globals.js domain numTicks 
** lin_alg_utils.js getKernel get2dDotSpace
** plot_utils.js displayTransConceptPlot display2dTransform
**********************************************/

/* ----------------------
Set up fake data and params for the grid
and dot spaces.
* ----------------------- */

// var kernelInitDotSpace = get2dDotSpace(xDomain = plotDomain
//            , yDomain = plotDomain
//            , numTicks = plotNumTicks);

// var kernelTransMatrix = [[1, 0], [2, 0]]

// var kernelSpace = getKernel(kernelInitDotSpace, kernelTransMatrix);
// // var kernelIsOriginSpace = true;

// // plotSpaceId
// var a = new DisplayTransConceptPlot(conceptId = "#kernel"
//                         , buttonId = "#kernel_transform"
//                         , initDotSpace = kernelInitDotSpace
//                         , highlightSpace = kernelSpace
//                         , domain = plotDomain
//                         , width = plotWidth
//                         , height = plotHeight
//                         , numTicks = plotNumTicks
//                         , transMatrix = kernelTransMatrix
//                         , duration = 4000
//                         )

// var ConceptExample  = function(conceptId
//                                 , buttonId
//                                 , initDotSpace
//                                 , highlightSpace
//                                 , domain
//                                 , width
//                                 , height
//                                 , numTicks
//                                 , transMatrix
//                                 , duration){


//     return {
//         init :  {
            
            
//             // some other initialising
//         },
//         displayTransConceptPlot : function() {
//             displayTransConceptPlot(conceptId = _conceptId
//                         , buttonId = _buttonId
//                         , initDotSpace = _initDotSpace
//                         , highlightSpace = _highlightSpace
//                         , domain = _domain
//                         , width = _width
//                         , height = _height
//                         , numTicks = _numTicks
//                         , transMatrix = _transMatrix
//                         , duration = _duration
//                         );
//         }
//     };
// };

// var ConceptExample  = (function(){
//     var _conceptId = ""; // private
//     var _buttonId = "";
//     var _initDotSpace = [[]]; // list of data points
//     var _highlightSpace = [[]]; // list of data points
//     var _domain = [];
//     var _width;
//     var _height;
//     var _numTicks;
//     var _transMatrix;
//     var _duration;

//     return {
//         init : function(conceptId
//                        , buttonId
//                        , initDotSpace
//                        , highlightSpace
//                        , domain
//                        , width
//                        , height
//                        , numTicks
//                        , transMatrix
//                        , duration) {
//             _conceptId = conceptId;
//             _buttonId = buttonId;
//             _initDotSpace = initDotSpace;
//             _highlightSpace = highlightSpace;
//             _domain = domain;
//             _width = width;
//             _height = height;
//             _numTicks = numTicks;
//             _transMatrix = transMatrix;
//             _duration = duration;
            
//             // some other initialising
//         },
//         displayTransConceptPlot : function() {
//             displayTransConceptPlot(conceptId = _conceptId
//                         , buttonId = _buttonId
//                         , initDotSpace = _initDotSpace
//                         , highlightSpace = _highlightSpace
//                         , domain = _domain
//                         , width = _width
//                         , height = _height
//                         , numTicks = _numTicks
//                         , transMatrix = _transMatrix
//                         , duration = _duration
//                         );
//         }
//     };
// }());