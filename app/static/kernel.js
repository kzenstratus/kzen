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

var myGeocode = '{{geocode |tojson}}';

var kernelInitDotSpace = get2dDotSpace(xDomain = plotDomain
           , yDomain = plotDomain
           , numTicks = plotNumTicks);

var kernelTransMatrix = [[1, 0], [2, 0]]

var kernelSpace = getKernel(kernelInitDotSpace, kernelTransMatrix);
var kernelIsOriginSpace = true;

// plotSpaceId
displayTransConceptPlot(conceptId = "#kernel"
                        , buttonId = "#kernel_transform"
                        , initDotSpace = kernelInitDotSpace
                        , highlightSpace = kernelSpace
                        , domain = plotDomain
                        , width = plotWidth
                        , height = plotHeight
                        , numTicks = plotNumTicks
                        , transMatrix = kernelTransMatrix
                        , duration = 4000
                        )