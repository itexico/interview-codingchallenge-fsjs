var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var ObjectId = require('mongoose').Types.ObjectId; 

var MyList = require('../models/list');

/* GET api listing. */
router.get('/', function(req, res, next) {
  res.json({ message: 'API root.' });
  next();
});

router.route('/mylists')
  .get(function(req, res) {
    console.log('Show lists');

    MyList.find(function(err, lists) {
      if (err)
          res.send(err);
      res.json(lists);
    });
  })

  .post(function(req, res){
    'use sctrict';
    console.log('Add new list.');
    console.log(req.body);
    var newList = new MyList();
    newList.name = req.body.name;
    newList.description = req.body.description;
    newList.creator = req.body.creator;
    newList.creation_date = new Date();
    newList.items = req.body.items;
    newList.save(function (err, newList) {
      if (err) return console.error(err);
    });
    res.status(200).send(req.body);
  })
  .put(function(req, res){
    'use sctrict';
    console.log('Update list.');
    var idFromString =  new ObjectId(req.body._id);

    MyList.update({ _id: idFromString }, req.body, { multi: false }, function (err, raw) {
      if (err) return handleError(err);
        console.log('The raw response from Mongo was ', raw);
    });
    res.status(200).send(req.body);
  })
  .delete(function(req, res){
    'use sctrict';
    console.log('Update list.');
    var idFromString =  new ObjectId(req.body._id);

    MyList.remove({ _id: idFromString }, function (err, raw) {
      if (err) return handleError(err);
        console.log('The raw response from Mongo was ', raw);
    });
    res.status(200).send(req.body);
  });

router.route('/mylists/:id')
  .get(function(req, res){
    var id= req.params.id;
    console.log(id);
    MyList.findById(id, function(err, lists){
      if (err) return console.error(err);
      if(lists.length == 0) //if no match is found return empty object
        res.json({});
      res.json(lists[0]);
    });
  });

module.exports = router;
