let mongoose = require("mongoose");

let ItemSchema = mongoose.Schema({
  title: String,
  list: {
    type: mongoose.Schema.ObjectId,
    ref: "List"
  }
});

module.exports = mongoose.model("Item", ItemSchema);
