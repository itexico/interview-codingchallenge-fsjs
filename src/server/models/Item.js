const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Item must have a name'
  },
  list: {
    type: mongoose.Schema.ObjectId,
    ref: 'List',
    required: 'Item must belong to a list'
  }
});

module.exports = mongoose.model('Item', itemSchema);
