'use strict';

var mongoose = require('mongoose'),
        List = mongoose.model('Lists');

exports.index = function (req, res) {
    List.find({})
            .populate('items', ['description', 'list_id'])
            .exec(function (err, lists) {
                if (err)
                    res.send(err);
                res.json(lists);
            });
};

exports.create = function (req, res) {
    var list = new List(req.body);
    list.save(function (err, list) {
        if (err)
            res.send(err);
        res.json(list);
    });
};

exports.update = function (req, res) {
    List.findOneAndUpdate({_id: req.params.id}, req.body, {new : true}, function (err, list) {
        if (err)
            res.send(err);
        res.json(list);
    });
};

exports.destroy = function (req, res) {
    List.remove({
        _id: req.params.id
    }, function (err, list) {
        if (err)
            res.send(err);
        res.json({message: 'Task successfully deleted'});
    });
};

