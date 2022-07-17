from flask import Flask, render_template, json, jsonify, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

@app.route('/')
def index():
    task_list = Task.query.all()
    print(task_list)
    return str(task_list)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    priority = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(300))
    # classification = db.Column()




@app.route('/new', methods=['POST'])
def new():
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        data = request.json
        new_task = Task(title=(data['title']), priority=data['priority'], description=data['description'])
        db.session.add(new_task)
        db.session.commit()
        return str(new_task)
    else:
        return 'Content-Type not supported!'



if __name__ == "__main__": #creates database by running python app.py
    db.create_all()
    app.run(debug=True)

