/*********************************************
 ** Data and meta data
 ** Imports
 ** lin_alg_utils.js getKernel get2dDotSpace
 **********************************************/

besselBias = {
    "plotDomain": [-5, 5],
    "plotWidth": 500,
    "plotHeight": 500,
    "numTicksArr": [10, 10],
    "space": get2dDotSpace([-5, 5], [-5, 5], 10)
};


var vecCoordJsonBesselBias = {

    "staticMean": {
        "coordList": [
            [
                [-5, 0],
                [5, 0]
            ],
            [
                [-5, 0],
                [5, 0]
            ],
            [
                [-5, 0],
                [5, 0]
            ],
            [
                [-5, 0],
                [5, 0]
            ]
        ],
        "color": "#68a2ff" // blue
            ,
        "hasHead": false,
        "labels": Array(4).fill("avg 1"),
        "labelLoc": Array(4).fill([-45, -10])
    },
    "movingMean": {
        "coordList": [
            [
                [-5, 0],
                [5, 0]
            ],
            [
                [-5, -3],
                [5, -3]
            ],
            [
                [-5, 3],
                [5, 3]
            ],
            [
                [-5, 0],
                [5, 0]
            ]
        ],
        "color": "#FD5F00" // orange
            ,
        "hasHead": false,
        "labels": Array(4).fill("avg 2"),
        "labelLoc": Array(4).fill([-45, 15])

    },
    "a": {
        "coordList": [
            [
                [-3, 2],
                [-3, 0]
            ],
            [
                [-3, 2],
                [-3, -3]
            ],
            [
                [-3, 2],
                [-3, 3]
            ],
            [
                [-3, 2],
                [-3, 0]
            ]
        ],
        "color": "#6bcc35" // green
            ,
        "labels": Array(4).fill("a"),
        "labelLoc": Array(4).fill([-20, -5])
    },
    "b": {
        "coordList": [
            [
                [0, 2],
                [0, 0]
            ],
            [
                [0, 2],
                [0, -3]
            ],
            [
                [0, 2],
                [0, 3]
            ],
            [
                [0, 2],
                [0, 0]
            ]
        ],
        "color": "#6bcc35" // "#6bcc35" // green
            ,
        "labels": Array(4).fill("c"),
        "labelLoc": Array(4).fill([-20, -5])
    },
    "c": {
        "coordList": [
            [
                [3, 2],
                [3, 0]
            ],
            [
                [3, 2],
                [3, -3]
            ],
            [
                [3, 2],
                [3, 3]
            ],
            [
                [3, 2],
                [3, 0]
            ]
        ],
        "color": "#6bcc35" // "#6bcc35" // green
            ,
        "labels": Array(4).fill("e"),
        "labelLoc": Array(4).fill([-20, -5])
    }
    // , "d" : {"coordList" : [[[-1,0], [-1,0]]
    //                       , [[-1,0], [-1,-3]]
    //                       , [[-1,0], [-1,3]]
    //                       , [[-1,0], [-1,0]]
    //                            ]
    //                       , "color" : "#6bcc35" // blue
    //                       , "labels" : Array(4).fill("d")
    //                       , "labelLoc" : Array(4).fill([-20, -5])
    //                   }
    //   , "e" : {"coordList" : [[[1,0], [1,0]]
    //                         , [[1,0], [1,-3]]
    //                         , [[1,0], [1,3]]
    //                         , [[1,0], [1,0]]
    //                          ]
    //                 , "color" : "#6bcc35" // "#6bcc35" // green
    //                 , "labels" : Array(4).fill("e")
    //                 , "labelLoc" : Array(4).fill([-20, -5])
    //             }
    ,
    "f": {
        "coordList": [
            [
                [-2, -2],
                [-2, 0]
            ],
            [
                [-2, -2],
                [-2, -3]
            ],
            [
                [-2, -2],
                [-2, 3]
            ],
            [
                [-2, -2],
                [-2, 0]
            ]
        ],
        "color": "#6bcc35" // "#6bcc35" // green
            ,
        "labels": Array(4).fill("b"),
        "labelLoc": Array(4).fill([-20, -5])
    }

    ,
    "g": {
        "coordList": [
            [
                [2, -2],
                [2, 0]
            ],
            [
                [2, -2],
                [2, -3]
            ],
            [
                [2, -2],
                [2, 3]
            ],
            [
                [2, -2],
                [2, 0]
            ]
        ],
        "color": "#6bcc35" // "#6bcc35" // green
            ,
        "labels": Array(4).fill("d"),
        "labelLoc": Array(4).fill([-20, -5])
    }
};
var captionCoordJson = {
    "top_caption": {
        "textList": ["Avg 2 == Avg 1", "Avg 2 < Avg 1", "Avg 2 > Avg 1", "Avg 2 == Avg 1"],
        "textCoordList": Array(4).fill([
            [-4, 4.2],
            [-4, 4.2]
        ]),
        "colorList": Array(4).fill("grey")
    },
    "bot_caption": {
        "textList": ["a", "b", "c", "d"],
        "textCoordList": Array(4).fill([
            [-4, 3.2],
            [-4, 3.2]
        ]),
        "colorList": Array(4).fill("grey")
    }

}

besselBiasPayload = {
    "conceptId": "bessel-bias",
    "duration": 1500,
    "vecCoordJson": vecCoordJsonBesselBias,
    "plotDomain": [-5, 5],
    "plotWidth": 500,
    "plotHeight": 500,
    "numTicksArr": [10, 10],
    "space": [
        [-3, 2],
        [0 , 2],
        [3 , 2]
        // , [-1,0], [1,0]
        ,
        [-2, -2],
        [2 , -2]
    ],
    "captionCoordJson": captionCoordJson

};


var vecCoordJsonBesselBiasVar = {

    "staticMean": {
        "coordList": [
            [
                [-5, 0],
                [5, 0]
            ],
            [
                [-5, 0],
                [5, 0]
            ],
            [
                [-5, 0],
                [5, 0]
            ],
            [
                [-5, 0],
                [5, 0]
            ]
        ],
        "color": "#68a2ff" // blue
            ,
        "hasHead": false,
        "labels": Array(4).fill("avg 1"),
        "labelLoc": Array(4).fill([-45, -10])
    },
    
};

var besselBiasVarShift = -22
besselBiasVarPayload = {
    "conceptId": "bessel-bias",
    "duration": 1500,
    "vecCoordJson": vecCoordJsonBesselBiasVar,
    "plotDomain": [-5, 5],
    "plotWidth": 500,
    "plotHeight": 500,
    "numTicksArr": [10,50],
    "space": [
        [0, 0 + besselBiasVarShift]
        ,[1, 20 + besselBiasVarShift]
        ,[-1, 20 + besselBiasVarShift]
        ,[2, 48 + besselBiasVarShift]
        ,[-2, 48 + besselBiasVarShift]
    ],
    "captionCoordJson": captionCoordJson

};