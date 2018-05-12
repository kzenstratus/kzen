from flask import render_template
from app import app
import json

@app.route('/')
def get_data():
	data = [1, 'foo']
	return render_template('index.html', name = "JOE")


# @app.route('/index')
# def index():
#     user = {'username': 'Miguel'}
#     return render_template('index.html', title='Home', user=user)

if __name__ == "__main__":
	app.run()
