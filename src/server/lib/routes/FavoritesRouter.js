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
});

//We use PUT to edit a specific entry. In the case of our lists PUT is used to edit one list.
FavoritesRouter.route('/:listId').put(function (req, res) {
    _listModel2.default.findById(req.params.listId, function (err, list) {
        list.name = req.body.name;
        list.save();
        res.json(list);
    });
})
//Above we find a list and we change the properties of the list object stored in the database with those that are passed along with the request.


//PATCH will allow users to edit specific properties of a list object.
.patch(function (req, res) {
    _listModel2.default.findById(req.params.listId, function (err, list) {
        if (req.body._id) {
            //If the users pass an _id as one of the properties they want to edit, we ignore that request because IDs shouldn't be changed.
            delete req.body._id;
        }
        for (var b in req.body) {
            //for loop loops through the remaining properties from the incoming object and updates the properties found in the database with those coming through the request.
            list[b] = req.body[b];
        }
        list.save();
        res.json(list);
    });
})
//Above we pull the particular list from the database and modify all the properties that match the incoming information.


//POST is used to add new content to the database.
.post(function (req, res) {
    var list = new _listModel2.default(req.body);
    list.save();
    res.status(201).send(list);
})
//Above we'll use it to add new lists.


//DETELE will allow users to delete an entire list
.delete(function (req, res) {
    _listModel2.default.findById(req.params.listId, function (err, list) {
        list.remove(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(204).send('removed');
            }
        });
    });
});

exports.default = FavoritesRouter;