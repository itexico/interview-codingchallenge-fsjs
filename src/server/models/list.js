var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost:27017/myListDb');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database Connected.');
});
var Schema = mongoose.Schema;
var ObjectId = require('mongoose').Types.ObjectId; 

var MyListSchema   = mongoose.Schema({
    name: String,
    description: String,
    creation_date: Date,
    creator: String,
    items: [
      {name: String}
    ]
});

MyListSchema.static('findById', function (id, callback) {
  var idFromString =  new ObjectId(id);
  return this.find({ _id: idFromString }, callback);
});

module.exports = db.model('MyList', MyListSchema);