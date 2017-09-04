'use strict';

var mongoose = require('mongoose'),
        User = mongoose.model('Users');

exports.show = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.index = function (req, res) {
    User.findOne({}, function (err, user){
        if(err)
            res.send(err);
        if(!user){
            var user = new User({name : 'userFirstName', last_name: 'userLastName'});
            user.save(function (err, user) {
                if (err)
                    res.send(err);
                res.json(user);
            }); 
        } else {
            res.send(user);
        }
    });
};

exports.create = function (req, res) {
    var user = new User(req.body);
    console.log(req.body);
    user.save(function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.destroy = function (req, res) {
    User.remove({
        _id: req.params.id
    }, function (err, list) {
        if (err)
            res.send(err);
        res.json({message: 'Task successfully deleted'});
    });
};


