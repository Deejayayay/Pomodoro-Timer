from flask import Flask, jsonify, request
#connects the frontend to the backend
from flask_cors import CORS

import datetime

x = datetime.datetime.now()

app = Flask(__name__)#
#allows cross origins requests
cors = CORS(app, origins='*')

#api route 
@app.route("/api/taskdb", methods=['GET'])
def tasks():
    return jsonify(
        {
            "task": [ 
                'do hw',
                'feed dog',
                'walk dog'
            ]
        }
    )

if __name__ == "__main__":
    app.run(debug=True, port=5987)