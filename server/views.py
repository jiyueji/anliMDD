from run import app
from flask import jsonify

@app.route('/')
def index():
    return jsonify({'message': 'This is a Dashboard Service.'})