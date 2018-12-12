const c = console.log,
  app = require('./app'),
  db = require('./models/db')

app.listen(
  app.get('port'), // Request variable
  () => c(`Start API RESTFul on the port ${app.get('port')}`)
)

c(
  '',
  process.env.NODE_ENV,
  '\n',
  process.env.URL_DB,
  '\n',
  process.env.PORT
)