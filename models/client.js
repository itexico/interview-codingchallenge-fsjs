var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var paintingSchema = new Schema({
  title: { type: String },
  author: { type: String },
  technique: { type: String, enum: ["oil", "watercolor", "pastel", "graphite"] },
  year: { type: Number}
});

module.exports = mongoose.model("Painting", paintingSchema);
module.exports = paintingSchema;
