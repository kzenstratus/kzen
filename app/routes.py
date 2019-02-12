from flask import render_template
from app import app
from app.utils.lin_alg import *
# from app.utils.test2 import *
import json

space = get2dDotSpace(xDomain = [-5,5], yDomain = [-5,5], numTicks = 11)
kernelTransMatrix = [[1, 0], [2, 0]]
kernelSpace = getKernelId(space, kernelTransMatrix)

transposeSpace = np.transpose(kernelTransMatrix)

globalVar = {"plotDomain" : [-5,5]
			, "plotWidth" : 500
			, "plotHeight" : 500
			, "numTicks" : 11 - 1
			, "space" : space.tolist()}


kernelPayload = {"conceptId" : "#kernel"
				, "buttonId" : "#kernel_transform"
				, "duration" : 4000
				, "tarColor" : "red"
				, "highlightSpace" : kernelSpace
				, "transMatrix" : kernelTransMatrix}

transposePayload = {"conceptId" : "#transpose"
				, "buttonId" : "#transpose_transform"
				, "duration" : 4000
				, "tarColor" : "red"
				, "highlightSpace" : kernelSpace
				, "transMatrix" : transposeSpace.tolist()}

basisPayload = {"conceptId" : "#basis_payload"
				, "buttonId" : "#basis_payload_transform"
				, "duration" : 4000
				, "tarColor" : "red"
				, "highlightSpace" : kernelSpace
				, "transMatrix" : transposeSpace.tolist()
				}

@app.route('/')
def lin_alg():
	# geocode = [1, 'foo', space]
	return render_template('index.html'
		, globalVar = globalVar
		, kernelPayload = kernelPayload
		, transposePayload = transposePayload
		, basisPayload = basisPayload
		)

# @app.route('/index')
# def index():
#     user = {'username': 'Miguel'}
#     return render_template('index.html', title='Home', user=user)

if __name__ == "__main__":
	app.run()

