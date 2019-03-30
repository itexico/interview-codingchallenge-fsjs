import { mongoose, db } from '../dal/mongoDbConn.js';

var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId; 

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

export default db.model('MyList', MyListSchema);