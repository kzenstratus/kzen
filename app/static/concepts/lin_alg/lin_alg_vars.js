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


var vecCoordJsonLinCombo = {"xVec" : {"coordList" : [[[0,0], [1, 0]]
                                              	   , [[0,0], [1,0]]
                                              	   , [[0,0], [1,0]]
                                              	   // start stretching to get different vecs
                                              	   , [[0,0], [3,0]]
                                              	   , [[0,0], [3,0]]
                                              	   , [[0,0], [3,0]]
                                              ]
                                              , "color" : "#68a2ff" // blue
                                              , "labels" : Array(6).fill("a")

                                          }
                          , "yVec" : {"coordList" : [[[0,0], [0,1]]
                                                     , [[1,0], [1,1]]
                                                     , [[1,0], [1,1]]
                                                     // start stretching to get different vecs
                                                     , [[3,0], [3,1]]
                                                     , [[3,0], [3,3]]
                                                     , [[3,0], [3,3]]
                                                     ]
                                        , "color" : "#6bcc35" // "#6bcc35" // green
                                        , "labels" : Array(6).fill("b")
                                    }
                        , "zVec" : {"coordList" : [[[0,0], [-2,1]]
                                                 , [[0,0], [-2,1]]
                                                 , [[1,1], [-1,2]]
                                                 , [[3,1], [1,2]]
                                                 , [[3,3], [1,4]]
                                                 , [[3,3], [4,2]]
                                                  ]
                                        , "color" : "#ff80ff" // "#6bcc35" // green
                                        , "labels" : Array(6).fill("c")
                                    }
                        , "vec" : {"coordList" : [[[null, null], [null,null]]
                                                 , [[null,null], [null,null]]
                                                 , [[0,0], [-1,2]]
                                                 , [[0,0], [1,2]]
                                                 , [[0,0], [1,4]]
                                                 , [[0,0], [4,2]]
                                                   ]
                                        , "color" : "#cc4634" // orange
                                        , "labels" : Array(6).fill("d")
                                        }
                                    };


linComboPayload = {"conceptId" : "linear-combination"
				, "buttonId" : "lin_combo_button"
				, "duration" : 1500
				, "vecCoordJson": vecCoordJsonLinCombo
			}

var vecCoordJsonOrtho = {"xVec" : {"coordList" : [[[0,0], [1, 0]]
                                              , [[0,0], [4,0]]
                                              , [[0,0], [-2,0]]
                                              , [[0,0], [-2,0]]
                                              , [[0,0], [-2,0]]
                                              , [[0,0], [3,0]]
                                              ]
                                              , "color" : "#68a2ff" // blue
                                              , "labels" : Array(6).fill("v1")
                                }
                                , "yVec" : {"coordList" : [[[0,0], [0,1]]
                                                     , [[0,0], [0,1]]
                                                     , [[0,0], [0,1]]
                                                     , [[0,0], [0,4]]
                                                     , [[0,0], [0,-2]]
                                                     , [[0,0], [0,-4]]
                                                     ]
                                        , "color" : "#68a2ff" // "#6bcc35" // green
                                        , "labels" : Array(6).fill("v2")
                                      }
                                    };
            // Calculate the sum of vectors.
vecCoordJsonOrtho = Object.assign(vecCoordJsonOrtho
		, {"vec" : {"coordList" : math.add(vecCoordJsonOrtho.xVec.coordList, vecCoordJsonOrtho.yVec.coordList)
					   ,"color" : "#cc4634"
					   , "labels" : Array(6).fill("v3")
					}
				})
            // vecCoordJsonOrtho = Object.assign(vecCoordJsonOrtho
            //                                   , {"xVecHelp" : {"coordList" : math.add(swapVecCoord(vecCoordJsonOrtho.xVec.coordList), vecCoordJsonOrtho.vec.coordList)
            //                                                   , "isLine" : true
            //                                                   , "color" : "#6bcc35"
                                                              
            //                                                 }
            //                                     , "yVecHelp" : {"coordList" : math.add(swapVecCoord(vecCoordJsonOrtho.yVec.coordList), vecCoordJsonOrtho.vec.coordList)
            //                                                   , "isLine" : true
            //                                                   , "color" : "#68a2ff"
                                                              
            //                                                 }
            //                                      })
            //                                      
basisPayload = {"conceptId" : "basis"
				, "buttonId" : "basis_transform"
				, "duration" : 1500
				, "tarColor" : "red"
				, "vecCoordJson": vecCoordJsonOrtho
				// , "highlightSpace" : [18, 39, 60, 81, 102]
				// , "listNextDotSpaces" : [kernelNextDotSpace, startSpace]
				// 
			}

basisNonOrthoPayload = {"conceptId" : "basis_non_ortho"
						, "buttonId" : "basis_non_ortho_transform"
						, "duration" : 1500
						, "tarColor" : "red"
						, "highlightSpace" : [18, 39, 60, 81, 102]
						, "listNextDotSpaces" : [kernelNextDotSpace, startSpace]
				
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
