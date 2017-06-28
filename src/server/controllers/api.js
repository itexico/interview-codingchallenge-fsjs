const  express = require('express');
var router = express.Router();

/* Require model */
var models = require('../models');
/* Require middlewares functions */

router.all('/api*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });
 

router.get('/', function (req, res) {
    res.render('index.html', {title: "Interview Coding Challenge"});
});

router.get('/api/getAllFavStuffs', function (req, res) {
    models.favorite_stuff.find({}, function (err, data) {
        if (err) {
            res.json({error: true, message: "There isn't information yet.", response: ""});
        }
        res.json({error: false, message: "All Favorites Stuff", response: data});
    });
});

router.get('/api/getAllFavStuffsNames', function (req, res) {
    models.favorite_stuff.find({}, {fav_stuff_name: 1}, function (err, data) {
        if (err) {
            res.json({error: true, message: "There isn't information yet.", response: ""});
        }
        res.json(data);
    });
});

router.post('/api/addNewFavStuff*', function (req, res) {
    if ((typeof req.body.fav_stuff_name == "undefined") || (typeof req.body.fav_stuff_list == "undefined")) {
        res.json({error: true, message: "You need to provide 'fav_stuff_name' and 'fav_stuff_list'", response: ""});
    } else {
        var NewStuff = new models.favorite_stuff({fav_stuff_name: req.body.fav_stuff_name, fav_stuff_list: req.body.fav_stuff_list});
        NewStuff.save(function (err, data) {
            if (err) {
                res.json({error: true, message: "Your Favorite Stuff could not be added", response: ""});
            } else {
                res.json({error: false, message: "Your Favorite stuff have been added correctly.", response: data});
            }
        });
    }
});
router.put('/api/UpdateFavStuff/:FavStuffId*', function (req, res) {
    if ((typeof req.body.fav_stuff_name == "undefined") || (typeof req.body.fav_stuff_list == "undefined")) {
        res.json({error: true, message: "You need to provide 'fav_stuff_name' and 'fav_stuff_list'", response: ""});
    }
    var update_info = {fav_stuff_name: req.body.fav_stuff_name, fav_stuff_list: req.body.fav_stuff_list};
    models.favorite_stuff.update({_id: req.params.FavStuffId}, update_info, function (err, raw) {
        if (err) {
            res.json({error: true, message: "Your Favorite Stuff could not be Updated", response: ""});
        }
        res.json({error: false, message: "Your Favorite stuff have been added correctly.", response: raw});
    });
});

router.delete('/api/DeleteFavStuff', function (req, res) {
    models.favorite_stuff.findByIdAndRemove({_id: req.query._id}, {}, function (err, raw) {
        if (err) {
            res.json({error: true, message: "The list item could not be removed", response: ""});
        }
        res.json({error: false, message: "The list item have been removed corretly", response: ""});
    });
});

router.get('/api/getAllFavStuffs', function (req, res) {
    models.favorite_stuff.find({}, {fav_stuff_name: 1}, function (err, data) {
        if (err) {
            res.json({error: true, message: "There isn't information yet.", response: ""});
        }
        res.json(data);
    });
});

router.get('/api/getAllFavStuffs', function (req, res) {
    models.favorite_stuff.find({}, {fav_stuff_name: 1}, function (err, data) {
        if (err) {
            res.json({error: true, message: "There isn't information yet.", response: ""});
        }
        res.json(data);
    });
});

module.exports = router;