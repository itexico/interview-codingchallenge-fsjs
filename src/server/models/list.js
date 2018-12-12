const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let List = new Schema({
  list_name: {
    type: String
  },
  stuffs: [{
    name: String,
    type: String
}]
},{
    collection: 'list'
});

module.exports = mongoose.model('List', List);