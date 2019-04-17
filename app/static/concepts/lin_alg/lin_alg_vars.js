/*********************************************
** Data and meta data
** Imports
** lin_alg_utils.js getKernel get2dDotSpace
**********************************************/

linAlgGlobalVar = {"plotDomain" : [-5,5]
					, "plotWidth" : 500
					, "plotHeight" : 500
					, "numTicks" : 10
					, "space" : get2dDotSpace([-5,5], [-5,5], 10)
				}


basisPayload = {"conceptId" : "basis"
				, "buttonId" : "basis_transform"
				, "duration" : 2000
				, "tarColor" : "red"
				// , "highlightSpace" : [18, 39, 60, 81, 102]
				// , "listNextDotSpaces" : [kernelNextDotSpace, startSpace]
				// 
			}
basisNonOrthoPayload = {"conceptId" : "basis_non_ortho"
						, "buttonId" : "basis_non_ortho_transform"
						, "duration" : 2000
						, "tarColor" : "red"
						, "highlightSpace" : [18, 39, 60, 81, 102]
						, "listNextDotSpaces" : [kernelNextDotSpace, startSpace]
				// 
			}



var startSpace = get2dDotSpace(linAlgGlobalVar.plotDomain
                                        , linAlgGlobalVar.plotDomain
                                        , linAlgGlobalVar.numTicks);

var kernelNextDotSpace = getTransformSpace(startSpace, [[1, 0], [2, 0]])._data

kernelPayload = {"conceptId" : "kernel"
				, "buttonId" : "kernel_transform"
				, "duration" : 4000
				, "tarColor" : "red"
				, "highlightSpace" : [18, 39, 60, 81, 102]
				, "transMatrix" : [[1, 0], [2, 0]]
				, "listNextDotSpaces" : [kernelNextDotSpace, startSpace]}

imagePayload = {"conceptId" : "image"
				, "buttonId" : "image_transform"
				, "duration" : 4000
				, "tarColor" : "red"
				, "highlightSpace" : [5, 16, 27, 38, 49, 60, 71, 82, 93, 104, 115]
				, "transMatrix" : [[1, 0], [2, 0]]
				, "listNextDotSpaces" : [kernelNextDotSpace, startSpace]}



transposeNormalPayload = {"conceptId" : "#transpose_normal"
				, "buttonId" : "#transpose_transform_normal"
				, "duration" : 4000
				, "tarColor" : "red"
				, "highlightSpace" : []
				, "transMatrix" : [[1, 0], [2, 0]]}

transposePayload = {"conceptId" : "#transpose"
				, "buttonId" : "#transpose_transform"
				, "duration" : 4000
				, "tarColor" : "red"
				, "highlightSpace" : []
				, "transMatrix" : [[1, 2], [0, 0]]}
