from flask import Flask, render_template, g, jsonify, request
import sqlite3
from contextlib import closing

# configuration
DATABASE = 'db.sqlite3'
DEBUG = True
SECRET_KEY = 'development key'

app = Flask(__name__)

# database setup
def connect_db():
  return sqlite3.connect(DATABASE)

@app.before_request
def before_request():
  g.db = connect_db()

@app.after_request
def after_request(response):
  g.db.close()
  return response

def query_db(query, args=(), one=False):
  cur = g.db.execute(query, args)
  rv = [dict((cur.description[idx][0], value)
    for idx, value in enumerate(row)) for row in cur.fetchall()]
  return (rv[0] if rv else None) if one else rv

def init_db():
  with closing(connect_db()) as db:
    with app.open_resource('db_schema.sql', mode='r') as f:
      db.cursor().executescript(f.read())
    db.commit()

init_db()


# HTTP API
@app.route('/test', methods=['GET'])
def test():
  #return "Hello World!"
  stuff = [0,1,2]
  return jsonify({'test':stuff})


if __name__ == '__main__':
  app.run(debug=DEBUG)
