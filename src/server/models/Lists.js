const mongoose = require('mongoose');
const { Schema } = mongoose;

const listSchema = new Schema ({
  lists: [{
    listName: String,
    items: Array
  }]
})

mongoose.model('lists', listSchema)