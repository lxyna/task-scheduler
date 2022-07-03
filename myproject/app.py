from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    description = db.Column(db.String(200))
    complete = db.Column(db.Boolean)

    #def __repr__(self):
        #return '<Task %r>' % self.id

@app.route('/')
def index():
    task_list = Task.query()
    print(task_list)
    return render_template('base.html')

if __name__ == "__main__":
    db.create_all()

    new_task = Task(title="Build Task", description="idk", complete=False)
    db.session.add(new_task)
    db.session.commit()

    app.run(debug=True)