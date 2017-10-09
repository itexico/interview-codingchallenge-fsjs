"use strict";

var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

const server = callback => {
	// App Starting
	var app = express();
	app.use(bodyParser.json({type: '*/*'}));
	
	// Refactor this zone.
	app.use(function(req, res, next) {
  		res.header("Access-Control-Allow-Origin", "*");
  		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  		res.header ("Access-Control-Allow-Methods", 'POST, GET, PUT, DELETE, OPTIONS');
  		next();
	});

	// Routes Generator.
    require('../../routes/routesLoader')(app);

	app.listen(3000, function() {
    console.log("Node Server Running on http://localhost:3000");
    callback(null,"The server started correctly.")
  });

};
module.exports = server;