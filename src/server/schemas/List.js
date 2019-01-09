let mongoose = require("mongoose");

let ListSchema = mongoose.Schema({
  title: String
});

module.exports = mongoose.model("List", ListSchema);
