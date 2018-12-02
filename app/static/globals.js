var plotWidth = 500, plotHeight = 500;


var plotDomain = [-5, 5]
var plotNumTicks = 10

var fakeData = [[1,1], [2,2], [3,3], [4,4],
                [2,1], [3,2], [4,3],
                [1,2], [2,3], [3,4],
                [1,3], [3,1],
                [0,1], [0,2], [2,0], [1,0]]

// The above is the positive space, negate everything and 
// concat it to append the flipped version.
fakeData = fakeData.concat(math.dotMultiply(math.matrix(fakeData), -1)._data)

