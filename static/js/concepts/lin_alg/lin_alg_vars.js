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
                                        , "labelLoc" : Array(6).fill([0.96, 0.96])
                                        }
                                    };


linComboPayload = {"conceptId" : "linear-combination"
				, "buttonId" : "lin_combo_button"
				, "duration" : 1500
				, "vecCoordJson": vecCoordJsonLinCombo
        , "textList" : Array(3).fill("Connect a,b,c to get Vec d").concat(
                                     ["Stretch Vec A", "Stretch Vec B", "Shrink Vec C"])
        , "textCoordList" : Array(6).fill([[-4.8,4.3], [-4.8,4.3]])
        , "textColorList" : Array(3).fill("#cc4634").concat(["#68a2ff"
                                                             , "#6bcc35"
                                                             , "#ff80ff"])
			}



var vecCoordJsonLinInd = {"xVec" : {"coordList" : [[[0,0], [2, 0]]
                                                   , [[0,0], [2,0]]
                                                   , [[0,0], [2,0]]
                                                   , [[0,0], [2,0]]
                                                   
                                              ]
                                              , "color" : "#68a2ff" // blue
                                              , "labels" : Array(4).fill("a")

                                          }
                          , "yVec" : {"coordList" : [[[0,0], [0,2]]
                                                     , [[0,0], [0,2]]
                                                     , [[0,0], [0,2]]
                                                     , [[0,0], [0,1]]
                                                     
                                                     ]
                                        , "color" : "#6bcc35"
                                        , "labels" : Array(4).fill("b")
                                    }
                        , "zVec" : {"coordList" : [[[0,0], [-2,1]]
                                                 , [[0,2], [-2,3]]
                                                 , [[0,2], [2,1]]
                                                 , [[0,1], [2,0]]
                                                 
                                                  ]
                                        , "color" : "#ff80ff"
                                        , "labels" : Array(4).fill("c")
                                    }

                                  };

linIndPayload = {"conceptId" : "linear-independence"
        , "buttonId" : "lin_ind_button"
        , "duration" : 1500
        , "vecCoordJson": vecCoordJsonLinInd
        , "textList" : Array(3).fill("Flip and Stretch C").concat(
                                     ["Shrink B"])
        , "textCoordList" : Array(4).fill([[-4.8,4.3], [-4.8,4.3]])
        , "textColorList" : Array(3).fill("#ff80ff").concat(["#6bcc35"])
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
            

basisPayload = {"conceptId" : "basis"
				, "buttonId" : "basis_transform"
				, "duration" : 1500
				, "vecCoordJson": vecCoordJsonOrtho
        , "textList" : Array(2).fill("Quadrant 1").concat(
                       Array(2).fill("Quadrant 2"),
                                     ["Quandrant 3", "Quandrant 4"])
        , "textCoordList" : Array(6).fill([[-4.8,4.3], [-4.8,4.3]])
        , "textColorList" : Array(6).fill("#cc4634")
				}

var vecCoordJsonBasisNonOrtho = {"xVec" : 
                            {"coordList" : [[[0,0], [1,-1]]
                                          , [[0,0], [2, -2]]
                                          , [[0,0], [4,-4]]
                                          , [[0,0], [-1,1]]
                                          , [[0,0], [-2,2]]
                                          , [[0,0], [-2,2]]
                                          , [[0,0], [-2,2]]
                                          , [[0,0], [-2,2]]
                                          , [[0,0], [-2,2]]
                                          ]
                              , "color" : "#68a2ff" // blue
                              , "labels" : Array(9).fill("v1")
                            }
                        , "yVec" : {"coordList" : [[[0,0], [0,2]]
                                                 , [[0,0], [0,3]]
                                                 , [[0,0], [0,5]]
                                                 , [[0,0], [0,0]]
                                                 , [[0,0], [0,-1]]
                                                 , [[0,0], [0,0]]
                                                 , [[0,0], [0,2]]
                                                 , [[0,0], [0,-3]]
                                                 , [[0,0], [0,-4]]
                                                 ]
                                                 
                                 ,  "color" : "#68a2ff" // green
                                 , "labels" : Array(9).fill("v2")
                                }
                      , "vec" : {"coordList" : [[[0,0], [1,1]]
                                              , [[0,0], [2,1]]
                                              , [[0,0], [4, 1]]
                                              , [[0,0], [-1,1]]
                                              , [[0,0], [-2,1]]
                                              , [[0,0], [-2,2]]
                                              , [[0,0], [-2,4]]
                                              , [[0,0], [-2,-1]]
                                              , [[0,0], [-2,-2]]
                                              ]
                                  ,"color" : "#cc4634"
                                  , "labels" : Array(9).fill("v3")
                                }
                    };

basisNonOrthoPayload = {"conceptId" : "basis_non_ortho"
						, "buttonId" : "basis_non_ortho_transform"
						, "duration" : 1500
            , "vecCoordJson" : vecCoordJsonBasisNonOrtho
				
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
