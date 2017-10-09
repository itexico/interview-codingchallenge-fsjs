var server      = require('./configuration/initializers/server');
var dataBase    = require('./configuration/initializers/dataBase');
var async       = require('async');

// Modules.
async.series([
   dataBase
   ,server ]
  , (error,resultado) => console.info(error?error:"RESTFUL API Started correctly.")
);