from calendar import c
from flask import Flask, render_template, json, jsonify, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)
CORS(app)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    priority = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(300))
    classification = db.Column(db.Integer)
    complete = db.Column(db.Boolean)

    def init(self, title, priority, description, classification, complete):
        self.title = title
        self.priority = priority
        self.description = description
        self.classification = classification
        self.complete = complete

class TaskSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'priority', 'description', 'classification', 'complete')

task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)

@app.route('/fetch', methods=['GET'])
def index():
        task_list = Task.query.all()
        return tasks_schema.jsonify(task_list)

@app.route('/delete', methods=['DELETE'])
def delete():
    task = Task.query.get(request.json['id'])

    if task == None:
        return 'Task not found'

    db.session.delete(task)
    db.session.commit()
    return 'Task deleted'

@app.route('/edit', methods=['PUT'])
def edit():
    task = Task.query.get(request.json['id'])

    if task == None:
        return 'Task not found'

    title = request.json['title']
    priority = request.json['priority']
    description = request.json['description']
    classification = request.json['classification']

    task.title = title
    task.priority = priority
    task.description = description
    task.classification = classification

    db.session.commit()
    return task_schema.jsonify(task)

@app.route('/new', methods=['POST'])
def new():
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        data = request.json
        new_task = Task(title=(data['title']), priority=data['priority'], description=data['description'], classification=data['classification'], complete=False)
        db.session.add(new_task)
        db.session.commit()
        return task_schema.jsonify(new_task)
    else:
        return 'Content-Type not supported!'

@app.route('/complete', methods=['PUT'])
def complete():
    task = Task.query.get(request.json['id'])

    if task == None:
        return 'Task not found'

    task.complete = not task.complete

    db.session.commit()
    return task_schema.jsonify(task)

if __name__ == "__main__": #creates database by running python app.py
    db.create_all()
    app.run(debug=True)