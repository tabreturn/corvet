import cherrypy, sqlite3, os


# routes

class Corvet(object):
  
  @cherrypy.expose
  def default(self,*args,**kwargs):
    return open('index.html')


# database

resultsdb = 'results.sqlite'

resultsschema = open('results_schema.sql').read()
conn = sqlite3.connect(resultsdb)
c = conn.cursor()
c.executescript(resultsschema)
conn.commit()
conn.close()

def dbEntry(result):
  conn = sqlite3.connect(resultsdb)
  c = conn.cursor()
  c.execute('INSERT INTO results (user, task, score) VALUES (?, ?, ?)',
   (result['user'], result['task'], result['score'])
  )
  conn.commit()
  conn.close()


# api

class Results:
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
  Results(), '/api/results',
  {'/':
    {'request.dispatch': cherrypy.dispatch.MethodDispatcher()}
  }
)

class Survey:
  exposed = True
  
  def POST(self, **kwargs):
    
    for key in kwargs:
      print(key)
      print(kwargs[key])
    
    #dbEntry(result)
    #return 'new entry captured: {}'.format(result)

cherrypy.tree.mount(
  Survey(), '/api/survey',
  {'/':
    {'request.dispatch': cherrypy.dispatch.MethodDispatcher()}
  }
)


# run

abspath = os.path.dirname(os.path.abspath(__file__))

cherrypy.config.update({
  'tools.staticdir.on': True,
  'tools.staticdir.dir': abspath,
})

cherrypy.quickstart(Corvet())
