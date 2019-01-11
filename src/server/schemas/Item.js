const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({
  title: String,
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "List"
  }
});

module.exports = mongoose.model("Item", ItemSchema);
