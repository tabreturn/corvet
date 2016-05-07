import cherrypy
import sqlite3


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
  
  exposed = True

  @cherrypy.tools.accept(media='text/plain')
  def GET(self):
    return 'get'

  def POST(self):
    return 'post'

  def PUT(self):
    return 'put'

  def DELETE(self):
    return 'delete'
  
  @cherrypy.expose
  def index(self):
    return """<html>
      <head></head>
      <body>
        <form method="post" action="test">
          <input type="text" value="8" name="length" />
          <button type="submit">Give it now!</button>
        </form>
      </body>
    </html>"""
  
  @cherrypy.expose
  def test(self, length):
    return length


cherrypy.quickstart(Corvet())
