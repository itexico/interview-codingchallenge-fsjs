var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var bookSchema = new Schema({
    title: {type: String},
    year: {type: Number},
    author: {type: String},
    genre: {type: String, enum:
    ['Sci-Fi', 'Novel', 'Drama', 'Comedy']}
  });


module.exports = mongoose.model('Books', bookSchema);
module.exports = bookSchema;
