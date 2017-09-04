'use strict';

var mongoose = require('mongoose'),
        Item = mongoose.model('Items');
var List = require('../controllers/listController');
List = mongoose.model('Lists');

exports.index = function (req, res) {
    Item.find({}, function (err, items) {
        if (err)
            res.send(err);
        res.json(items);
    });
};

exports.create = function (req, res) {
    var list = List.findById(req.body.list_id, function (err, list) {
        if (err)
            res.send(err);
        var params = req.body;
        params._creator = list.id;
        var item = new Item(params);
        list.items.push(item);
        list.save();
        item.save();
        res.json(item);
    });
};

exports.update = function (req, res) {
    Item.findOneAndUpdate({_id: req.params.id}, req.body, {new : true}, function (err, item) {
        if (err)
            res.send(err);
        res.json(item);
    });
};

exports.destroy = function (req, res) {
    Item.remove({
        _id: req.params.id
    }, function (err, item) {
        if (err)
            res.send(err);
        res.json({message: 'Task successfully deleted'});
    });
};

