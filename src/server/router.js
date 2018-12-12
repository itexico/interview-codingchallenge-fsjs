const express = require('express'),
  Stuff = require('./routes/stuff')
  api = express.Router()

api.get('/', async(req, res)=> {
  await res.status(200).send({
    message: 'Funcionando API RESTful de lista de stuff'
  })
}) // Asincronous function


// Good practice ._.)/
api.get('/stuffs', Stuff.getStuffs)
api.post('/stuff', Stuff.postStuff)
api.get('/stuff/:id', Stuff.getStuff)
api.put('/stuff/:id',Stuff.putStuff)
api.delete('/stuff/:id', Stuff.deleteStuff)


module.exports = api