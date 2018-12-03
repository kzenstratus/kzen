/* ----------------------
Set up fake data and params for the grid
and dot spaces.
* ----------------------- */
/*********************************************
** transpose Concept
** Imports
** globals.js domain numTicks 
** lin_alg_utils.js gettranspose get2dDotSpace
** plot_utils.js displayTransConceptPlot display2dTransform
**********************************************/

/* ----------------------
Set up fake data and params for the grid
and dot spaces.
* ----------------------- */


var transposeInitDotSpace = get2dDotSpace(xDomain = plotDomain
           , yDomain = plotDomain
           , numTicks = plotNumTicks);


var transposeTransMatrix = [[1, 0], [2, 0]]
var transposeSpace = getKernel(transposeInitDotSpace, transposeTransMatrix);


transposeTransMatrix = math.transpose(transposeTransMatrix);

// #transpose

var transposeIsOriginSpace = true;

// plotSpaceId
displayTransConceptPlot(conceptId = "#transpose"
                        , buttonId = "#transpose_transform"
                        , initDotSpace = transposeInitDotSpace
                        , highlightSpace = transposeSpace
                        , domain = plotDomain
                        , width = plotWidth
                        , height = plotHeight
                        , numTicks = plotNumTicks
                        , transMatrix = transposeTransMatrix
                        , duration = 4000
                        )

