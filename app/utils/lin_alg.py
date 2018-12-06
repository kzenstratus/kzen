import numpy as np

def get2dDotSpace(xDomain, yDomain, numTicks):
	xPoints = np.linspace(xDomain[0], xDomain[1], numTicks)
	yPoints = np.linspace(yDomain[0], yDomain[1], numTicks)
	allPoints = np.transpose([np.tile(xPoints, len(yPoints))
		, np.repeat(yPoints, len(xPoints))])
	return(allPoints)

def getTransformSpace(space, transMatrix):
	return (np.dot(space, transMatrix))


def getKernelId(space, transMatrix):
	'''
	[Calculates the kernel, or all the points which get mapped to zero. 
	This allows us to color the kernel.]
	
	@param {[1,2]d double array} space [a matrix representing the original space]
	@param {[1,2]d double array} transMatrix [a transformation matrix]
	@return {n x 2 double array} - a list of the kernel
	'''
	newSpace = getTransformSpace(space, transMatrix)

	# Don't actually need to calculate the kernel. Just 
	# take the index of space of points which go to 0.
	kernelId = [idx for idx, coord in enumerate(newSpace) if np.array_equal(coord, [0,0])]
	
	return(kernelId)

def getImageId(space, transMatrix):
	newSpace = getTransformSpace(space, transMatrix)

	imageId = [idx for idx, coord in enumerate(newSpace) if np.array_equal(coord, space[idx])]
	return(imageId)




