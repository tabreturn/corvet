import cherrypy
import sqlite3
import os

import random

conn = sqlite3.connect('results.sqlite')
c = conn.cursor()
c.execute("INSERT INTO results (name, score) VALUES ('{}', 20)".format(random.random()))
conn.commit()
conn.close()

'''
# Never do this -- insecure!
symbol = 'RHAT'
c.execute("SELECT * FROM stocks WHERE symbol = '%s'" % symbol)

# Do this instead
t = ('RHAT',)
c.execute('SELECT * FROM stocks WHERE symbol=?', t)
print c.fetchone()

# Larger example that inserts many records at a time
purchases = [('2006-03-28', 'BUY', 'IBM', 1000, 45.00),
             ('2006-04-05', 'BUY', 'MSFT', 1000, 72.00),
             ('2006-04-06', 'SELL', 'IBM', 500, 53.00),
            ]
c.executemany('INSERT INTO stocks VALUES (?,?,?,?,?)', purchases)
'''



class Corvet(object):
  
  @cherrypy.expose
  def index(self):
    return file("index.html")
  
  @cherrypy.expose
  def result(self, length):
    return length


print 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
abspath = os.path.dirname(os.path.realpath(__file__))


cherrypy.config.update({
  "tools.staticdir.on": True,
  "tools.staticdir.dir": abspath
})

cherrypy.quickstart(Corvet())
