import cherrypy
import sqlite3
import os

import random

abspath = os.path.dirname(os.path.abspath(__file__))

class Corvet(object):
  
  @cherrypy.expose
  def index(self):
    return file("index.html")
  
  @cherrypy.expose
  def result(self, length):
    return length

cherrypy.config.update({
  "tools.staticdir.on": True,
  "tools.staticdir.dir": abspath
})




def dbEntry(result):
  conn = sqlite3.connect('results.sqlite')
  c = conn.cursor()
  c.execute("INSERT INTO results (name, score) VALUES (?, ?)", (result['user'], result['task'] ))
  conn.commit()
  conn.close()

class Results:
  # curl -d user='jim' -d task='1' -d result='22' -X POST '127.0.0.1:8080/api/results/'
  exposed = True
  
  def POST(self, user, task, result):
    
    result = {
      'user': user,
      'task': task,
      'result': result
    }
    dbEntry(result)
    return ('new entry: %s' % result)


cherrypy.tree.mount(
  Results(), '/api/results',
  {'/':
    {'request.dispatch': cherrypy.dispatch.MethodDispatcher()}
  }
)





cherrypy.quickstart(Corvet())
