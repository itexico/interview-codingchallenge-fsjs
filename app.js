var express = require("express"),
        app = express(),
        bodyParser = require("body-parser"),
        methodOverride = require("method-override"),
        mongoose = require("mongoose");

mongoose.createConnection('mongodb://localhost/books', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());
app.use(methodOverride());

var BookCtrl = require("./controllers/books");

//API routes
var books = express.Router();

books.route("/books")
  .get(BookCtrl.findAllBooks)
  .post(BookCtrl.addBook);

books.route("/books/:id")
  .get(BookCtrl.findById)
  .put(BookCtrl.updateBook)
  .delete(BookCtrl.deleteBook);

app.use("/api", books);

var router = express.Router();

// router.get('/', function(req, res){
//   res.send("Hello world!");
// });
app.use(express.static(__dirname + '/src'));
app.get('*', function(req, res) {
	res.sendFile('./src/client/index.html');
});

app.use(router);

mongoose.createConnection('mongodb://localhost/books', function(err,res){
  if(err){
    console.log('ERROR: connecting to Database. ' + err);
  }
  app.listen(3000,function(){
    console.log("Node server running on http://localhost:3000");
  });

});
