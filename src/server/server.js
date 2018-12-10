const c = console.log,
  app = require('./app')

app.listen(
  app.get('port'), // Request variable
  () => c(`Start API RESTFul on the port ${app.get('port')}`)
)

c(
  '',
  process.env.NODE_ENV,
  '\n',
  process.env.urlDB,
  '\n',
  process.env.PORT
)