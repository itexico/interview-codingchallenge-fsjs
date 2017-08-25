var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var booksSchema = new Schema({
    title: {type: String},
    year : {type: Number},
    author: {type: String},
    genre: {type: String, enum:
    ['Sci-Fi', 'Novel', 'Drama', 'Comedy']}
  });

// mongoose.connect('mongodb://localhost/books');
module.exports = mongoose.model('books', booksSchema);
