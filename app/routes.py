from flask import render_template
from app import app
# from app.utils.lin_alg import *
from app.utils.test2 import *
import json


@app.route('/')
def lin_alg():
	geocode = [1, 'foo', wtf2()]
	return render_template('index.html', geocode=geocode)

# @app.route('/index')
# def index():
#     user = {'username': 'Miguel'}
#     return render_template('index.html', title='Home', user=user)

if __name__ == "__main__":
	app.run()

