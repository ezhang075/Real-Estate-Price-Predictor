from flask import Flask, render_template, request, jsonify
from sklearn.preprocessing import LabelEncoder
import requests
import pandas as pd
import pickle


with open('lookup.pkl', 'rb') as file:
    lookup = pickle.load(file)


app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/predict', methods=['POST'])
def get_housing_prediction():
    address: str = request.json['address']
    state: str = request.json['state']

    # Load model

    with open('model.pkl', 'rb') as file:
        model = pickle.load(file)
    
    location_data = lookup[(lookup['COUNTY'] == (address + ' County')) & (lookup['STATE'] == state)]

    prices = []
    dates = list(range(2024, 2034))
    for i, date in enumerate(dates):
        features = pd.DataFrame({
            'COUNTY': LabelEncoder().fit_transform(location_data['COUNTY']),
            'STATE': LabelEncoder().fit_transform(location_data['STATE']),
            'YEAR': date,
            'WFIR_AFREQ': (location_data['WFIR_AFREQ'] + i * location_data['WFIR_AFREQ_GROWTH']),
            'WFIR_EXPT': (location_data['WFIR_EXPT'] + i * location_data['WFIR_EXPT_GROWTH']),
            'WFIR_RISKS': (location_data['WFIR_RISKS'] + i * location_data['WFIR_RISKS_GROWTH'])
        })
        predicted_price = model.predict(features)
        # aooend the predicted price with avergage yearly growth rate to offset fire risk
        prices.append(predicted_price[0] + ((predicted_price[0] * float(location_data['ZHVI_GROWTH'])) * i))

    response = {
        'address': f'{address}, {state}',
        'dates': dates,
        'prices': prices,
    }

    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True)