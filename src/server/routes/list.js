const express = require('express');
const listRoutes = express.Router();

// Require Business model in our routes module
let List = require('../models/list');

// Defined store route
listRoutes.route('/add').post(function (req, res) {
  let list = new List(req.body);
  list.save()
    .then(list => {
      res.status(200).json({list: 'list added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
listRoutes.route('/').get(function (req, res) {
    List.find(function(err, list){
    if(err){
      console.log(err);
    }
    else {
      res.json(list);
    }
  });
});

// Defined edit route
listRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  List.findById(id, function (err, list){
      res.json(list);
  });
});

//  Defined update route
listRoutes.route('/update/:id').post(function (req, res) {
    List.findById(req.params.id, function(err, list) {
    if (!list)
      res.status(404).send("data is not found");
    else {
        list.list_name = req.body.list_name;
        list.save().then(list => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
listRoutes.route('/delete/:id').get(function (req, res) {
    List.findByIdAndRemove({_id: req.params.id}, function(err, list){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = listRoutes;