const mongoose = require("mongoose");


const noteSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {type: String, required: true}, 
  items: [String]
});

module.exports = mongoose.model("Note", noteSchema);
