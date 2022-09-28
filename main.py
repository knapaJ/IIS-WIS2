from flask import Flask, jsonify
import datetime

app = Flask(__name__)


@app.route('/hello-world', methods=['GET'])
def hello_world():
    return jsonify({
        "Message": "Hello world",
        "Time": datetime.datetime.now()
    })


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
