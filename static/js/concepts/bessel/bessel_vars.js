/*********************************************
** Data and meta data
** Imports
** lin_alg_utils.js getKernel get2dDotSpace
**********************************************/

besselBias = {"plotDomain" : [-5,5]
					, "plotWidth" : 500
					, "plotHeight" : 500
					, "numTicks" : 10
					, "space" : get2dDotSpace([-5,5], [-5,5], 10)
				};


var vecCoordJsonBesselBias = {

                            "staticMean" : {"coordList" : [[[-5,0], [5, 0]]
                                                         , [[-5,0], [5, 0]]
                                                         , [[-5,0], [5, 0]]
                                                         , [[-5,0], [5, 0]]
                                                   ]
                                              , "color" : "#68a2ff" // blue
                                              , "hasHead":false
                                              , "labels" : Array(4).fill("avg 1")
                                              , "labelLoc" : Array(4).fill([0.9, 0.96])

                                          }
                          , "movingMean" : {"coordList" : [[[-5,0], [5, 0]]
                                                         , [[-5,-3],[5,-3]]
                                                         , [[-5,3], [5,3]]
                                                         , [[-5,0], [5, 0]]
                                                   ]
                                              , "color" : "#cc4634" // blue
                                              , "hasHead": false
                                              , "labels" : Array(4).fill("avg 2")
                                              , "labelLoc" : Array(4).fill([0.9, 1.06])

                                          }
                          , "a" : {"coordList" : [[[-3,2], [-3,0]]
                                              	, [[-3,2], [-3,-3]]
                                              	, [[-3,2], [-3,3]]
                                                , [[-3,2], [-3,0]]
                                              	   ]
                                              , "color" : "#6bcc35" // blue


                                          }
                          , "b" : {"coordList" : [[[0,2], [0,0]]
                                                , [[0,2], [0,-3]]
                                                , [[0,2], [0,3]]
                                                , [[0,2], [0,0]]
                                                     
                                                     ]
                                        , "color" : "#6bcc35" // "#6bcc35" // green
                                    }
                        , "c" : {"coordList" : [[[3,2], [3,0]]
                                              , [[3,2], [3,-3]]
                                              , [[3,2], [3,3]]
                                              , [[3,2], [3,0]]
                                                ]
                                        , "color" : "#6bcc35" // "#6bcc35" // green
                                    }
                        , "d" : {"coordList" : [[[-1,0], [-1,0]]
                                              , [[-1,0], [-1,-3]]
                                              , [[-1,0], [-1,3]]
                                              , [[-1,0], [-1,0]]
                                                   ]
                                              , "color" : "#6bcc35" // blue
                                          }
                          , "e" : {"coordList" : [[[1,0], [1,0]]
                                                , [[1,0], [1,-3]]
                                                , [[1,0], [1,3]]
                                                , [[1,0], [1,0]]
                                                 ]
                                        , "color" : "#6bcc35" // "#6bcc35" // green
                                    }
                        , "f" : {"coordList" : [[[-2,-2], [-2,0]]
                                              , [[-2,-2], [-2,-3]]
                                              , [[-2,-2], [-2,3]]
                                              , [[-2,-2], [-2,0]]
                                                ]
                                        , "color" : "#6bcc35" // "#6bcc35" // green
                                    }

                        , "g" : {"coordList" : [[[2,-2], [2,0]]
                                              , [[2,-2], [2,-3]]
                                              , [[2,-2], [2,3]]
                                              , [[2,-2], [2,0]]
                                                ]
                                        , "color" : "#6bcc35" // "#6bcc35" // green
                                    }
                        // , "d" : {"coordList" : [[[null, null], [null,null]]
                        //                          , [[null,null], [null,null]]
                        //                          , [[0,0], [-1,2]]
                        //                          ]
                        //                 , "color" : "#cc4634" // orange
                        //                 }
                                    };


besselBiasPayload = {"conceptId" : "bessel-bias"
        , "duration" : 1500
				, "vecCoordJson": vecCoordJsonBesselBias
        , "plotDomain" : [-5,5]
        , "plotWidth" : 500
        , "plotHeight" : 500
        , "numTicks" : 10
        , "space" : [[-3,-2], [0,-2], [3,-2] 
                      , [-1,0], [1,0]
                      , [-2,2], [2,2]]
        , "textList" : ["Average x ", "WUBALUBADUBDUB", "OOOOOOH", "BOOOOOOOO"]
        , "textCoordList" : Array(4).fill([[-4,4.2], [-4,4.2]])
        , "textColorList" : Array(4).fill("green")
      };




