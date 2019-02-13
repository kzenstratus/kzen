from flask import render_template
from app import app


@app.route('/')
def lin_alg():
	# geocode = [1, 'foo', space]
	return render_template('index.html'
		)

# @app.route('/index')
# def index():
#     user = {'username': 'Miguel'}
#     return render_template('index.html', title='Home', user=user)

if __name__ == "__main__":
	app.run()

