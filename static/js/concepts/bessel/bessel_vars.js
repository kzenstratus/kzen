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
                [0, -5],
                [0, 5]
            ],
            [
                [0, -5],
                [0, 5]
            ],
            [
                [0, -5],
                [0, 5]
            ],
            [
                [0, -5],
                [0, 5]
            ],
            [
                [0, -5],
                [0, 5]
            ]
        ],
        "color": "#68a2ff" // blue
            ,
        "hasHead": false,
        "labels": Array(5).fill("avg 1"),
        "labelLoc": Array(5).fill([-45, 15]),
        "style" : "solid"
    },
    "movingMean": {
        "coordList": [
            [
                [0, -5],
                [0, 5]
            ],
            [
                [3, -5],
                [3, 5]
            ],
            [
                [0, -5],
                [0, 5]
            ],
            [
                [-3, -5],
                [-3, 5]
            ],
            [
                [0, -5],
                [0, 5]
            ],
        ],
        "color": "#FD5F00" // orange
            ,
        "hasHead": false,
        "labels": Array(5).fill("avg 2"),
        "labelLoc": Array(5).fill([10, 15]),
        "style" : "dash"

    },
    "right": {
        "coordList": [
            [
                [2, 0],
                [0,  0]
            ],
            [
                [2, 0],
                [3, 0]
            ],
            [
                [2, 0],
                [0,  0]
            ],
            [
                [2, 0],
                [-3,  0]
            ],
            [
                [2, 0],
                [0,  0]
            ]
        ],
        "color": "#6bcc35" // "#6bcc35" // green
            ,
        "labels": Array(5).fill("a"),
        "labelLoc": Array(5).fill([5, -10]),
        "style" : "solid"
    }
    ,
    "left": {
        "coordList": [
            [
                [-2, 0],
                [0,  0]
            ],
            [
                [-2, 0],
                [3, 0]
            ],
            [
                [-2, 0 ],
                [ 0, 0 ]
            ],
            [
                [-2, 0],
                [-3,  0]
            ],
            [
                [-2, 0],
                [0,  0]
            ]
        ],
        "color": "#6bcc35" // "#6bcc35" // green
            ,
        "labels": Array(5).fill("b"),
        "labelLoc": Array(5).fill([-11, -10]),
        "style" : "solid"
    }
};
var captionCoordJson = {
    "top_caption": {
        "textList": ["Avg 2 == Avg 1", "Avg 2 < Avg 1", "Avg 2 == Avg 1", "Avg 2 > Avg 1", "Avg 2 == Avg 1"],
        "textCoordList": Array(5).fill([
            [-4, 4.2],
            [-4, 4.2]
        ]),
        "colorList": Array(5).fill("grey")
    },
    "bot_caption": {
        "textList": ["a", "b", "c", "d"],
        "textCoordList": Array(5).fill([
            [-4, 3.2],
            [-4, 3.2]
        ]),
        "colorList": Array(4).fill("grey")
    }

}

besselBiasPayload = {
    "conceptId": "bessel-bias",
    // "duration": 1500,
    "vecCoordJson": vecCoordJsonBesselBias,
    "plotDomain": [-5, 5],
    "plotWidth": 500,
    "plotHeight": 500,
    "numTicksArr": [10, 10],
    "space": [
      [2, 0]
      , [-2, 0]
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

// this shift is because we push the x axis down
// var besselBiasVarShift = -24
var besselBiasVarShift = -9
besselBiasVarPayload = {
    "conceptId": "bessel-bias",
    // "duration": 1500,
    "vecCoordJson": vecCoordJsonBesselBiasVar,
    "plotDomain": [-5, 5],
    "plotWidth": 500,
    "plotHeight": 500,
    // "numTicksArr": [10, 52],
    "numTicksArr": [10, 20],
    "space": [
        // [-2, 48 + besselBiasVarShift]
        // ,[-1, 20 + besselBiasVarShift]
        // ,[0, 0 + besselBiasVarShift]
        // ,[1, 20 + besselBiasVarShift]
        // ,[2, 48 + besselBiasVarShift]
        [-3, 18 + besselBiasVarShift]
        ,[-2, 8 + besselBiasVarShift]
        ,[-1, 2 + besselBiasVarShift]
        ,[0, 0 + besselBiasVarShift]
        ,[1, 2 + besselBiasVarShift]
        ,[2, 8 + besselBiasVarShift]
        ,[3, 18 + besselBiasVarShift]
    ],
    "captionCoordJson": captionCoordJson

};
