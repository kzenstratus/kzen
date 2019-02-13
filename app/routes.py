from flask import render_template
from app import app


@app.route('/')
def lin_alg():
	# geocode = [1, 'foo', space]
	return render_template('index.html')

if __name__ == "__main__":
	app.run()

