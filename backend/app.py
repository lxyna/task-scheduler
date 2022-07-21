from flask import Flask, render_template, json, jsonify, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow


app = Flask(name)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    priority = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(300))
    # classification = db.Column()

    def init(self, title, priority, description):
        self.title = title
        self.priority = priority
        self.description = description

class TaskSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'priority', 'description')

task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)

@app.route('/fetch', methods=['GET'])
def index():
        task_list = Task.query.all()
        return tasks_schema.jsonify(task_list)

@app.route('/new', methods=['POST'])
def new():
        title = request.json['title']
        priority = request.json['priority']
        description = request.json['description']
        new_task = Task(title, priority, description)
        db.session.add(new_task)
        db.session.commit()
        return task_schema.jsonify(new_task)

if name == "main": #creates database by running python app.py
    db.create_all()
    app.run(debug=True)

