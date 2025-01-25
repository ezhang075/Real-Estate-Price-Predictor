from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app, methods=['POST'])


@app.route('/predict', methods=['POST'])
def get_housing_prediction():
    address: str = request.form.get('address')

    # Mock response
    response = {
        'address': address,
        'prices': [(x, x**2) for x in range(2000, 2040)],
    }

    return jsonify(response)
