from flask import Flask, request, send_from_directory, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

# === Flask Setup ===
app = Flask(__name__, static_folder="../build", static_url_path="/")
CORS(app)

# === ML Prediction Function (trains model each time) ===
def calc(data):
    try:
        # 1. Load and prepare dataset
        required_columns = ['T', 'RH', 'WS', 'DNI', 'DHI', 'SZA', 'GHI', 'Energy (hourly)']
        df = pd.read_excel("cleaned_data.xlsx", skiprows=[1], usecols=required_columns)
        df = df.apply(pd.to_numeric, errors='coerce').dropna()
        df = df[~((df['DNI'] == 0) & (df['DHI'] == 0) & (df['GHI'] == 0))]

        # 2. Split features and target
        X = df[['T', 'RH', 'WS', 'DNI', 'DHI', 'SZA', 'GHI']]
        y = df['Energy (hourly)']

        # 3. Preprocess
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)

        # 4. Train model
        model = RandomForestRegressor(n_estimators=50, random_state=42)
        model.fit(X_scaled, y)

        # 5. Get input from request
        T = float(data["temperature"])
        RH = float(data["humidity"])
        WS = float(data["windSpeed"])
        DNI = float(data["dni"])
        DHI = float(data["dhi"])
        SZA = float(data["sza"])
        GHI = float(data["ghi"])
        capacity = float(data["capacity"])
        efficiency = float(data["efficiency"])

        input_features = np.array([[T, RH, WS, DNI, DHI, SZA, GHI]])
        input_scaled = scaler.transform(input_features)

        # 6. Predict
        predicted = model.predict(input_scaled)[0]
        adjusted_output = predicted * capacity * efficiency

        return round(adjusted_output, 4)

    except Exception as e:
        return str(e)

# === POST Endpoint for Prediction ===
@app.route("/postdata", methods=["POST"])
def postdata():
    data = request.get_json()
    result = calc(data)

    if isinstance(result, str):
        return jsonify({"status": "error", "message": result}), 400

    return jsonify({"status": "success", "predicted_energy_kWh": result}), 200

# === GET Endpoint to serve latest build ===
@app.route("/")
def home():
    return send_from_directory(app.static_folder, "index.html")

# === Run Flask App ===
if __name__ == "__main__":
    app.run(debug=True)
