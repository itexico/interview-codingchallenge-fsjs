'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FavoritesRouter = _express2.default.Router();
FavoritesRouter.get('/', function (req, res) {
    res.json([{
        id: 1,
        title: "Alice's Adventures in Wonderland",
        author: "Charles Lutwidge Dodgson"
    }, {
        id: 2,
        title: "Einstein's Dreams",
        author: "Alan Lightman"
    }]);
}).get('/2', function (req, res) {
    res.json({
        id: 2,
        title: "Einstein's Dreams",
        author: "Alan Lightman"
    });
});

exports.default = FavoritesRouter;