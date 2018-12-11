const express = require('express'),
  config = require('./config'),
  app = express(),
  router = require('./router')

// https://enable-cors.org

app
  .set('port', process.env.PORT)
  .use(express.urlencoded({extended:false})) // Code the data
  .use(express.json())
  .use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-TypeError, Accept')
    next()
  })
  .use('/api', router) // The api's home 

module.exports = app