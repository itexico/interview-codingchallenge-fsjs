const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const List =mongoose.model('List');

// Define collection and schema for Business
let Stuff = new Schema({
  stuff_name: {
    type: String
  },
},{
    collection: 'Stuff'
});

module.exports = mongoose.model('Stuff', Stuff);