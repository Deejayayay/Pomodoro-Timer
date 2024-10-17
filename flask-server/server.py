from flask import Flask

app = Flask(__name__)

#members api route
@app.route("/task")
def task():
    return {
        "project": ["p1", "p2", "p3"],
        "task": ["t1","t2","t3"],
        "completed": [False, True, True],
        "note": ["n1", "n2", "n3"]
        }

if __name__ == "__main__":
    app.run(debug=True)