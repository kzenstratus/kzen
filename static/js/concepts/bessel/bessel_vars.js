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

var numSteps = 7
// 1 = starting
// 2 = move over
// 3 = normalize
// 4 = move to farthest right
// l = 5, r = 1 -> 26 - 4 = 24
// 5 = move to middle
// 6 = move to farthest left
// 7 = move back to middle

var vecCoordJsonBesselBias = {

    "staticMean": {
        "coordList": Array(numSteps).fill([[0, -5],[0, 5]]),
        "color": "#68a2ff" // blue
            ,
        "hasHead": false,
        "labels": Array(numSteps).fill("avg 1"),
        "labelLoc": Array(numSteps).fill([-45, 15]),
        "style" : "solid"
    },
    "movingMean": {
        "coordList": [
            [[0, -5],[0, 5]]
          , [[0, -5],[0, 5]]
          , [[0, -5],[0, 5]]
          , [[3, -5],[3, 5]]
          , [[0, -5],[0, 5]]
          , [[-3, -5],[-3, 5]]
          , [[0, -5],[0, 5]]
        ],
        "color": "#FD5F00" // orange
            ,
        "hasHead": false,
        "labels": Array(numSteps).fill("avg 2"),
        "labelLoc": Array(numSteps).fill([10, 15]),
        "style" : "dash"

    },
    "right": {
        "coordList": [
            [[2, 1.5], [0, 1.5]]
          , [[2, 1.5], [0, 1.5]]
          , [[2, 1.5], [0, 1.5]]
          , [[2, 1.5], [3, 1.5]]
          , [[2, 1.5], [0, 1.5]]
          , [[2, 1.5], [-3,1.5]]
          , [[2, 1.5], [0, 1.5]]
        ],
        "color": "#FD5F00"// orange // "#6bcc35"green
            ,
        "labels": Array(numSteps).fill("a"),
        "labelLoc": Array(numSteps).fill([5, -10]),
        "style" : "solid"
    }
    ,
    "left": {
        "coordList": [
            [[-2, 1], [0, 1]]
          , [[-2, 1], [0, 1]]
          , [[-2, 1], [0, 1]]
          , [[-2, 1], [3, 1]]
          , [[-2, 1], [0, 1]]
          , [[-2, 1], [-3, 1]]
          , [[-2, 1], [0,  1]]
        ],
        "color": "#FD5F00"// orange  // "#6bcc35" green
            ,
        "labels": Array(numSteps).fill("b"),
        "labelLoc": Array(numSteps).fill([-11, -10]),
        "style" : "solid"
    },
    "staticRight": {
      "coordList": Array(numSteps).fill([[2, 0.5], [0,  0.5]])
    , "color": "#68a2ff"// blue // "#6bcc35"green
    // , "labels": Array(6).fill("a")
    // , "labelLoc": Array(6).fill([5, -10])
      , "style" : "solid"
  },
    "staticLeft": {
      "coordList": Array(numSteps).fill([[-2, 0.5], [0,  0.5]])
    , "color": "#68a2ff"// blue // "#6bcc35"green
    // , "labels": Array(6).fill("a")
      , "style" : "solid"
  }
};




// Set right origin points for the var plot.
let varX0 = 12
let varY0 = -4.5
// Blue Vectors on the right side, ie. static
let statL = vecCoordJsonBesselBias.staticLeft.coordList
let startDiff = math.abs(statL[0][0][0] - statL[0][1][0])
// statLT is the top static vec on the right plot
let statLT = [statL[0] // Start on the left plot
            // Starting spot on right plot
           , [[varX0 + 1, varY0 + startDiff], [varX0 + 1, varY0 + startDiff*2 + 0.001]]]
            .concat(Array(numSteps - 2).fill(
              [[varX0 + 1, varY0], [varX0 + 1, varY0 + 0.001]]))
            // Shrink to 0, make it a tiny bit more than 0 so arroy faces up. 
vecCoordJsonBesselBias["staticLeftT"] = {"coordList" : statLT
                                        , "color" :  "#68a2ff"// orange
                                        // , "labels": Array(numSteps).fill("a")
                                        // , "labelLoc": Array(numSteps).fill([5, -10])
                                        , "style" : "solid"
}

let statR = vecCoordJsonBesselBias.staticLeft.coordList
// statRB is the bot static vec on the right plot
let statRB = [statR[0] // Start on the left plot
           , [[varX0 + 1, varY0], [varX0 + 1, varY0 + startDiff]] // Starting spot on right plot
            ].concat(Array(numSteps - 2).fill(
              [[varX0 + 1, varY0], [varX0 + 1, varY0 + 0.001]] // Shrink to 0, make it a tiny bit more than 0 so arroy faces up. 
            ))
vecCoordJsonBesselBias["staticRightT"] = {"coordList" : statRB
                                        , "color" :  "#68a2ff"// orange
                                        // , "labels": Array(numSteps).fill("a")
                                        // , "labelLoc": Array(numSteps).fill([5, -10])
                                        , "style" : "solid"
}

// Moving Orange Vectors on the variance plot.
// Add right vertical vector
let r = vecCoordJsonBesselBias.right.coordList
let dTrue = math.abs(r[0][0][0] - r[0][1][0])// true variance used to normalize the changing variance
let rB = [r[0]]
for (let i = 1; i < r.length; i ++){
  let d = math.abs(r[i][0][0] - r[i][1][0]) // distance to mean
  console.log(i, d)
  d = d * d / 2 - dTrue // difference between true and other variance
  console.log(i, d)
  rB[i] = [[varX0, varY0], [varX0, d + varY0 + 0.001]]
}



// Add left vertical vector
let l = vecCoordJsonBesselBias.left.coordList
let lT = [l[0]]
for (let i = 1; i < l.length; i ++){
  let d = math.abs(l[i][0][0] - l[i][1][0]) // distance to mean
  d = d * d / 2 - dTrue
  lT[i] = [rB[i][1], [varX0, rB[i][1][1] + d + 0.001]]
}

// Shrink down to 0 to show normalization
rB[2] = [[varX0, varY0], [varX0, varY0 + 0.001]]
lT[2] = [[varX0, varY0], [varX0, varY0 + 0.001]]
vecCoordJsonBesselBias["rightT"] = {"coordList" : rB
                                  , "color" :  "#FD5F00"// orange
                                  , "labels": Array(numSteps).fill("a")
                                  , "labelLoc": Array(numSteps).fill([5, -10])
                                  , "style" : "solid"
}
vecCoordJsonBesselBias["leftB"] = {"coordList" : lT
                                  , "color" :  "#FD5F00"// orange
                                  , "labels": Array(numSteps).fill("b")
                                  , "labelLoc": Array(numSteps).fill([-11, -10])
                                  , "style" : "solid"
}

// Add right 

var captionCoordJson = {
    // "top_caption": {
    //     "textList": ["Avg 2 == Avg 1", "Avg 2 < Avg 1", "Avg 2 == Avg 1", "Avg 2 > Avg 1", "Avg 2 == Avg 1"],
    //     "textCoordList": Array(5).fill([
    //         [-4, 4.2],
    //         [-4, 4.2]
    //     ]),
    //     "colorList": Array(5).fill("grey")
    // },
    // "bot_caption": {
    //     "textList": ["a", "b", "c", "d"],
    //     "textCoordList": Array(5).fill([
    //         [-4, 3.2],
    //         [-4, 3.2]
    //     ]),
    //     "colorList": Array(4).fill("grey")
    // }
}

// Defines left plot.
besselBiasPayload = {
    "conceptId": "bessel-bias",
    "vecCoordJson": vecCoordJsonBesselBias,
    "plotDomain": [-5, 5],
    "plotWidth": 1100,
    "plotHeight": 1000,
    "numTicksArr": [10, 10],
    "space": [
      [2, 0], [-2, 0]
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
var besselBiasVarShift = -9
besselBiasVarPayload = {
    "conceptId": "bessel-bias",
    "vecCoordJson": vecCoordJsonBesselBiasVar,
    "plotDomain": [-5, 5],
    "plotWidth": 500,
    "plotHeight": 500,
    "numTicksArr": [10, 20],
    // defines the curved space.
    "space": [
        [-3 , 9 + besselBiasVarShift]
        ,[-2 , 4 + besselBiasVarShift]
        ,[-1 , 1 + besselBiasVarShift]
        ,[0, 0 + besselBiasVarShift]
        ,[1, 1 + besselBiasVarShift]
        ,[2, 4 + besselBiasVarShift]
        ,[3, 9 + besselBiasVarShift]
    ],
    "captionCoordJson": captionCoordJson

};
