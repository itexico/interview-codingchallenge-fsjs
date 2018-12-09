const express = require('express');
const api = express();
const bodyParser = require('body-parser');
const env = process.env;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var listSchema = new Schema(require('./Schemas/List.json'));
var List = mongoose.model('List',listSchema);

var itemSchema = new Schema(require('./Schemas/Item.json'));
var Item = mongoose.model('Item',itemSchema);

api.get("/CheckMongo", function(req, res){
  mongoose.connect('mongodb://localhost/test');
  var db = mongoose.connection;
  db.on('error', function(evt){
    res.status(200).send({"Status":evt});
  });
  
  db.once('open', function() {
    var newList = new List({_id:(new Date()).getTime(),Fields:[]});
    newList.DatosGenerales = {
      "Name": "String1",
      "Topic": "String1",
    };
    newList.save();
    res.status(200).send({"Status":"Connection correct"});
  });

   db.once('open', function() {
    var newItem = new Item({_id:(new Date()).getTime(),Fields:[]});
    newItem.DatosGenerales = {
      "Name": "String1",
      "Description": "String1",
    };
    newItem.save();
    res.status(200).send({"Status":"Connection correct"});
  });


});

api.get("/GetList", function(req, res){
  mongoose.connect('mongodb://localhost/test');
  var db = mongoose.connection;
  db.on('error', function(evt){
    res.status(200).send({"Status":evt});
  });
  
  db.once('open', function() {
    List.find({Fields:[] }).exec(function(error, results){
      
      res.status(200).send({"Status":(error ? error : results)});
    })
    
  });
});

api.get("/GetItem", function(req, res){
  mongoose.connect('mongodb://localhost/test');
  var db = mongoose.connection;
  db.on('error', function(evt){
    res.status(200).send({"Status":evt});
  });
  
  db.once('open', function() {
    Item.find({Fields:[] }).exec(function(error, results){
      
      res.status(200).send({"Status":(error ? error : results)});
    })
    
  });
});


module.exports = api;