from flask import Flask, request, send_from_directory, jsonify
from flask_cors import CORS
import joblib
import numpy as np

# === Flask Setup ===
app = Flask(__name__, static_folder="../build", static_url_path="/")
CORS(app)

# === Load Trained Model and Scaler ===
model = joblib.load("solar_model.pkl")
scaler = joblib.load("scaler.pkl")

# === Store prediction globally if needed ===
energy_output = 0.0

# === ML Prediction Function ===
def calc(data):
    try:
        # Extract input values from frontend
        T = float(data["temperature"])
        RH = float(data["humidity"])
        WS = float(data["windSpeed"])
        DNI = float(data["dni"])
        DHI = float(data["dhi"])
        SZA = float(data["sza"])
        GHI = float(data["ghi"])
        capacity = float(data["capacity"])
        efficiency = float(data["efficiency"])

        # Form feature vector
        input_features = np.array([[T, RH, WS, DNI, DHI, SZA, GHI]])
        input_scaled = scaler.transform(input_features)

        # Predict using ML model
        predicted = model.predict(input_scaled)[0]
        adjusted_output = predicted * capacity * efficiency

        return round(adjusted_output, 4)
    except Exception as e:
        return str(e)

# === POST Endpoint for Prediction ===
@app.route("/postdata", methods=["POST"])
def postdata():
    global energy_output
    data = request.get_json()

    result = calc(data)

    if isinstance(result, str):
        return jsonify({"status": "error", "message": result}), 400

    energy_output = result
    return jsonify({"status": "success", "predicted_energy_kWh": energy_output}), 200

# === GET Endpoint to retrieve last predicted value ===
@app.route("/getdata")
def getdata():
    return jsonify({"Energy Output": energy_output})

# === Serve React frontend ===
@app.route("/")
def home():
    return send_from_directory(app.static_folder, "index.html")

# === Start the Flask app ===
if __name__ == "__main__":
    app.run(debug=True)
