from flask import Flask, request, send_from_directory
from flask_cors import CORS

app = Flask(__name__, static_folder="../build", static_url_path="/")
CORS(app)
energy_output = 0

def calc(data):
    ghi = float(data['ghi'])
    temperature = float(data['temperature'])
    humidity = float(data['humidity'])
    windSpeed = float(data['windSpeed'])
    dhi = float(data['dhi'])
    system_capacity = float(data['capacity'])
    system_efficiency = float(data['efficiency'])

    return (float(system_capacity * (ghi/1000) * system_efficiency * 1))


@app.route("/postdata", methods=["POST"])
def postdata():
    global energy_output
    data = request.get_json()
    energy_output = calc(data)
    return {"status": "success", "received": data}, 200


@app.route("/getdata")
def getdata():
    return {"Energy Output": energy_output}

@app.route("/")
def home():
    return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    app.run()