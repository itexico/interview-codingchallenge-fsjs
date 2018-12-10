const c = console.log,
  app = require('./app')

app.listen(
  app.get('port'), // Request variable
  () => c(`Start API RESTFul on the port ${app.get('port')}`)
)