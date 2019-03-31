var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost:27017/myListDb');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database Connected.');
});

var dbAccessObject = new Object();
dbAccessObject.mongoose = mongoose;
dbAccessObject.db = db;

module.exports = dbAccessObject;