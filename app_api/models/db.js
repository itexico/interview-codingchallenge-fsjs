var mongoose = require('mongoose');
// this value must be in a config file or provide as env var.
var dbURI = 'mongodb://localhost/StuffOrganizer';

mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

require('./stuffs');
