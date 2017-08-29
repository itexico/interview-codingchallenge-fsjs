var express = require("express");
// to make a JSON
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
// to use and customize HTTP methods (get, post, delete, put)
var methodOverride = require("method-override");
var app = express();

// Saving connection to DataBase
mongoose.connect("mongodb://localhost/clients", function (err, res) {
  if (err) throw err;
  console.log("Connected to database");
});

// Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());

// Importing Models and Controllers
var models = require('./models/client')(app, mongoose);
var ClientCtrl = require('./controllers/clients');

var router = express.Router();

// Index
app.get("/", function (req, res) {
  res.send("Challenge accepted!");
});

app.use(router);

// Linking API routes
var api = express.Router();

api.route('/clients')
 .get(ClientCtrl.findAll)
 .post(ClientCtrl.add);

api.route('/clients/:id')
 .get(ClientCtrl.findById)
 .put(ClientCtrl.update)
 .delete(ClientCtrl.delete);

app.use("/api", api);

// Start server
app.listen(3000, function () {
  console.log("Listening on port 3000!")
});
