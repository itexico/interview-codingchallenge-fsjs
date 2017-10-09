"use strict";
var mongoose     = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = callback => {
  mongoose.Promise = Promise;
  mongoose.connect('mongodb://localhost:27017/myAppTest',{ useMongoClient: true }, (error, result) => {
    if(error){
      console.info("An error ocurred while configuring DataBase!");
      return callback(error,"An error ocurred while configuring DataBase!");
    }else{
      console.info("DataBase connection successful!");
      return callback(null,"DataBase connection successful");
    }
  });
};