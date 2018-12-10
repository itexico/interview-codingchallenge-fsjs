const express = require('express'),
  config = require('./config'),
  app = express(),
  router = require('./router')

app
  .set('port', process.env.PORT)
  .use(express.urlencoded({extended:false})) // Code the data
  .use(express.json())
  .use('/api') // The api's home 

module.exports = app