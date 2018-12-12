const express = require('express'),
  config = require('./config'),
  multer = require('multer'),
  upload = multer(),
  app = express(),
  router = require('./router')

// https://enable-cors.org

app
  .set('port', process.env.PORT)
  .use(express.json()) // Parse aplication json
  .use(express.urlencoded({extended:false})) // Code the data xwww-form-urlencoded
  .use(upload.array()) // CURL, POSTMAN, ETC
  .use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-TypeError, Accept')
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    next()
  })
  .use('/api', router) // The api's home 

module.exports = app