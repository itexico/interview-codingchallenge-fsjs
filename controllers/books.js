var mongoose = require("mongoose");
var bookSchema = require("./books.js");
var Books = mongoose.model("Books", bookSchema);

//This function return all books in the db
exports.findAllBooks = function(req, res) {
  Book.find(function(err, books){
    if(err) res.send(500, err.message);

    console.log("GET/books")
    res.status(200),jsonp(books);
  });
};

//This function return a book with specified id
exports.findById = function(req,res){
  Book.findById(req.params.id , function(err,book){
    if(err) return res.send(500, err.message);

    console.log("GET/book/" + req.params.id);
    res.status(200).jsonp(book);
  });
};

//This function insert a new book in the db, with method POST
exports.addBook = function(req, res){
  console.log("POST");
  console.log(req.body);

  var newBook = new Book({
    title: req.body.title,
    year: req.body.year,
    author: req.body.author,
    genre: req.body.genre
  });

  newBook.save(function(err, newBook){
    if(err) return res.status(500).send(err.message);
    res.status(200).jsonp(newBook);
  });
};

//This function update data with a specified ID, PUT

exports.updateBook = function(req,res) {
  Book.findById(req.params.id, function(err, book){
    book.title = req.body.title,
    book.year = req.body.year,
    book.author = req.body.author,
    book.genre = req.body.genre

    book.save(function(err){
      if(err) return res.status(500).send(err.message);
      res.status(200).jsonp(book);
    });
  });
};

//this function delete a book with a specified ID

exports.deleteBook = function(req, res) {
  Book.findById(req.params.id, function(err, book){
    book.remove(function(err){
      if(err) return res.send(500, err.message);
      res.status(200);
    });
  });
};
