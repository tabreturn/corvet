import cherrypy, sqlite3, os


# routes

class Corvet(object):
  
  @cherrypy.expose
  def index(self):
    return file("index.html")


# api

def dbEntry(result):
  conn = sqlite3.connect('results.sqlite')
  c = conn.cursor()
  c.execute("INSERT INTO results (user, task, score) VALUES (?, ?, ?)",
    (result['user'], result['task'], result['score'],)
  )
  conn.commit()
  conn.close()

class Api:
  exposed = True
  
  def POST(self, user, task, score):
    result = {
      'user': user,
      'task': task,
      'score': score
    }
    dbEntry(result)
    return 'new entry captured: {}'.format(result)

cherrypy.tree.mount(
  Api(), '/api/results',
  {'/':
    {'request.dispatch': cherrypy.dispatch.MethodDispatcher()}
  }
)


# run

abspath = os.path.dirname(os.path.abspath(__file__))

cherrypy.config.update({
  "tools.staticdir.on": True,
  "tools.staticdir.dir": abspath
})

cherrypy.quickstart(Corvet())
