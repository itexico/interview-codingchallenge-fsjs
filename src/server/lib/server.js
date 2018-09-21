'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _FavoritesRouter = require('./routes/FavoritesRouter');

var _FavoritesRouter2 = _interopRequireDefault(_FavoritesRouter);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = process.env.PORT || 5656;
// routes go here
app.listen(port, function () {
    console.log('http://localhost:' + port);
});

app.use('/api/Favorites', _FavoritesRouter2.default);

var db = _mongoose2.default.connect('mongodb://<Ambar>:<dbFavs123>@ds259912.mlab.com:59912/favsdb');