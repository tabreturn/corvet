import cherrypy
import sqlite3
import os

import random

conn = sqlite3.connect('results.sqlite')
c = conn.cursor()
t = (str(random.random()),)
c.execute("INSERT INTO results (name, score) VALUES (?, 20)", t)
conn.commit()
conn.close()

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

cherrypy.quickstart(Corvet())
