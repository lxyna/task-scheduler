from flask import Flask, render_template, jsonify, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# @app.route('/')
# def index():
#     task_list = Task.query.all()
#     print(task_list)
#     return str(task_list)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    priority = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(300))
    # classification = db.Column()




@app.route('/new', methods=['POST'])
def new():
    task1=Task( title="task1",  priority = 1, description = "description1" )
          #new_task = Task()
     db.session.add(task1)
     db.session.commit()
     



if __name__ == "__main__": #creates database by running python app.py
    db.create_all()
    
    app.run(debug=True)

