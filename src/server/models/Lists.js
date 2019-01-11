const mongoose = require('mongoose');
const { Schema } = mongoose;

const listSchema = new Schema ({
  lists: [{
    listName: String,
    listID: Number,
    items: [{
      content: String,
      itemID: Number
    }]
  }]
})

mongoose.model('lists', listSchema)