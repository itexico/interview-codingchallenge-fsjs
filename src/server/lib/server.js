'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _FavoritesRouter = require('./routes/FavoritesRouter');

var _FavoritesRouter2 = _interopRequireDefault(_FavoritesRouter);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = process.env.PORT || 5656;

//bodyParser
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(allowCrossDomain);

//API Routes
app.use('/api/Lists', _FavoritesRouter2.default);

// Connecting to the database
var db = _mongoose2.default.connect('mongodb://Ambar:dbFavs123@ds259912.mlab.com:59912/favsdb', { useNewUrlParser: true });

//Running the server
app.listen(port, function () {
  console.log('http://localhost:' + port);
});

function allowCrossDomain(req, res, next) {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

  var origin = req.headers.origin;
  if (typeof origin !== "undefined") {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
}

//DOCUMENTATION
/*RESTful API: 
      https://dev.to/aurelkurtula/building-a-restful-api-with-express-and-mongodb--3mmh
      https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue*/