'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _listModel = require('../models/listModel');

var _listModel2 = _interopRequireDefault(_listModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FavoritesRouter = _express2.default.Router();

FavoritesRouter.route('/').get(function (req, res) {
    _listModel2.default.find({}, function (err, lists) {
        res.json(lists);
    });

    // res.json([
    //     {
    //         id: 1,
    //         title: "Alice's Adventures in Wonderland",
    //         author: "Charles Lutwidge Dodgson"
    //     },
    //     {
    //         id: 2,
    //         title: "Einstein's Dreams",
    //         author: "Alan Lightman"
    //     }
    // ])
});
// FavoritesRouter.route('/:bookId')
// .get((req, res) => {
//     List.findById(req.params.bookId, (err, list) => {
//         res.json(list)
//     })  
// })
// .get('/2', (req,res) => {
//     res.json({
//         id: 2,
//         title: "Einstein's Dreams",
//         author: "Alan Lightman"
//     })
// })

exports.default = FavoritesRouter;