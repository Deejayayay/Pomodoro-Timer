from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)

# Configure SQLite Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database
db = SQLAlchemy(app)
CORS(app, origins='*')

# Define the Task model
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    def serialize(self):
        return {"id": self.id, "name": self.name}

# Create the database tables
with app.app_context():
    db.create_all()

# API route to handle GET, POST, and DELETE requests
@app.route("/api/taskdb", methods=['GET', 'POST', 'DELETE'])
def tasks():
    if request.method == 'GET':
        # Fetch all tasks from the database
        tasks = Task.query.all()
        return jsonify({"task": [task.serialize() for task in tasks]})

    if request.method == 'POST':
        # Get the new task from the request body
        data = request.get_json()
        new_task_name = data.get('task')

        if new_task_name:
            # Create a new task and save it to the database
            new_task = Task(name=new_task_name)
            db.session.add(new_task)
            db.session.commit()
            return jsonify({"message": "Task added successfully!", "task": new_task.serialize()}), 201
        else:
            return jsonify({"message": "Invalid data, task not added!"}), 400

    if request.method == 'DELETE':
        # Get the task id from the request body
        data = request.get_json()
        task_id = data.get('id')

        task_to_delete = Task.query.get(task_id)

        if task_to_delete:
            # Delete the task from the database
            db.session.delete(task_to_delete)
            db.session.commit()
            return jsonify({"message": f"Task '{task_to_delete.name}' deleted successfully!"}), 200
        else:
            return jsonify({"message": "Task not found!"}), 404

if __name__ == "__main__":
    app.run(debug=True, port=5987)
