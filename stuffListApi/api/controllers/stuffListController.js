'use strict';
var mongoose = require('mongoose'),
    Stuff = mongoose.model('Stuffs');

exports.list_all_stuffs = function(req, res) {
    Stuff.find({}, function(err, stuff) {
        if (err) res.send(err);
        res.json(stuff);
    });
};

exports.create_stuff = function(req, res) {
    var new_stuff = new Stuff(req.body);
    new_stuff.save(function(err, stuff) {
        if (err) res.send(err);
        res.json(stuff);
    });
};

exports.read_stuff = function(req, res) {
    Stuff.findById(req.params.stuffId, function(err, stuff) {
        if (err) res.send(err);
        res.json(stuff);
    });
};

exports.update_stuff = function(req, res) {
    Stuff.findOneAndUpdate({
        _id: req.params.stuffId
    }, req.body, {
        new: true
    }, function(err, stuff) {
        if (err) res.send(err);
        res.json(stuff);
    });
};

exports.delete_stuff = function(req, res) {
    Stuff.remove({
        _id: req.params.stuffId
    }, function(err, stuff) {
        if (err) res.send(err);
        res.json({
            message: 'Stuff deleted successfully.'
        });
    });
};

exports.delete_all_stuffs = function(req, res) {
    Stuff.remove({}, function(err, stuff) {
        if (err) res.send(err);
        res.json({
            message: 'All Stuff deleted successfully.'
        });
    });
};