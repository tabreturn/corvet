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

def dbEntry(table, result):
  insert = 'INSERT INTO {} ('.format(table)
  values = 'VALUES ('
  v = []
  i = 1
  
  for key in result:
    insert += key
    values += '?'
    v.append(result[key])
    
    if (i < len(result)):
      values += ', '
      insert += ', '
      i += 1
  
  insert += ') '
  values += ') '
  q = insert + values
  
  conn = sqlite3.connect(resultsdb)
  c = conn.cursor()
  c.execute(q, tuple(v))
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
    dbEntry('results', result)
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
