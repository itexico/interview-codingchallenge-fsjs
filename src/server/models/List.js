const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const listSchema = new mongoose.Schema({
  items: {
    type: mongoose.Schema.ObjectId,
    ref: 'Item',
  },
  type: {
    type: String,
    required: 'Please supply a type for the list',
  }
});

module.exports = mongoose.model('List', listSchema);