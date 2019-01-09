const mongoose = require("mongoose");

const ListSchema = mongoose.Schema({
  title: String
});

module.exports = mongoose.model("List", ListSchema);
