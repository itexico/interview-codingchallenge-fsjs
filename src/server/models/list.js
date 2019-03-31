var mongoDbAccess = require('../dal/mongoDbConn.js');

var Schema = mongoDbAccess.mongoose.Schema;
var ObjectId = mongoDbAccess.mongoose.Types.ObjectId; 

var MyListSchema = Schema({
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

module.exports = mongoDbAccess.db.model('MyList', MyListSchema);