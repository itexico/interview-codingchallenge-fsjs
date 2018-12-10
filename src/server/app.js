const express = require('express'),
  config = require('./config'),
  app = express(),
  router = require('./router')

app
  .set('port', ())
  .use(express.urlencoded({extended:false})) // Code the data
  .use(express.json())
  .use('/api') // The api's home 

module.exports = app