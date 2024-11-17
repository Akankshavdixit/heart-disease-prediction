import pickle
from flask import Flask, request, jsonify

app = Flask(__name__)

with open("heart_disease_logistic_regression.pkl", "rb") as f:
    model = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    features = data['features']

    prediction = model.predict([features])
    return jsonify({'prediction' : prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
    


