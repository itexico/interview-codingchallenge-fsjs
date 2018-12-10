const express = require('express');
const stuffRoutes = express.Router();

// Require Business model in our routes module
let Stuff = require('../models/stuff');

// Defined store route
stuffRoutes.route('/add').post(function (req, res) {
  let stuff = new Stuff(req.body);
  stuff.save()
    .then(list => {
      res.status(200).json({stuff: 'stuff added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
stuffRoutes.route('/').get(function (req, res) {
    Stuff.find(function(err, stuff){
    if(err){
      console.log(err);
    }
    else {
      res.json(stuff);
    }
  });
});

// Defined edit route
stuffRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Stuff.findById(id, function (err, stuff){
      res.json(stuff);
  });
});

//  Defined update route
stuffRoutes.route('/update/:id').post(function (req, res) {
  Stuff.findById(req.params.id, function(err, stuff) {
    if (!stuff)
      res.status(404).send("data is not found");
    else {
        stuff.stuff_name = req.body.stuff_name;
        stuff.save().then(stuff => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
stuffRoutes.route('/delete/:id').get(function (req, res) {
    Stuff.findByIdAndRemove({_id: req.params.id}, function(err, stuff){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = stuffRoutes;