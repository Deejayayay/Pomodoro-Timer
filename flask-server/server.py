from flask import Flask, jsonify, request
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database import Person, Base
import datetime

x = datetime.datetime.now()

app = Flask(__name__)

engine = create_engine("sqlite:///mydb.db", echo=True, pool_pre_ping=True)
Base.metadata.create_all(bind=engine)
Session = sessionmaker(bind=engine)
session = Session()

#api route to add a new person
@app.route("/data")
def get_task():
    return {
        'Name':"geek", 
        "Age":"22",
        "Date":x, 
        "programming":"python"
        }

if __name__ == "__main__":
    app.run(debug=True)