from flask import Flask, jsonify, request
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database import Person, Base

app = Flask(__name__)

engine = create_engine("sqlite:///mydb.db", echo=True, pool_pre_ping=True)
Base.metadata.create_all(bind=engine)
Session = sessionmaker(bind=engine)
session = Session()

#api route to add a new person
@app.route("/people", methods=["POST"])
def get_task():

    return {
        "project": ["p1", "p2", "p3"],
        "task": ["t1","t2","t3"],
        "completed": [False, True, True],
        "note": ["n1", "n2", "n3"]
    }

if __name__ == "__main__":
    app.run(debug=True)