// server.js

// BASE SETUP
// =============================================================================
var mongoose = require('mongoose');
var List    = require('./models/list');
var Item    = require('./models/item');

mongoose.connect('mongodb://admin:root@jello.modulusmongo.net:27017/upaDyh2u');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'welcome to the iTexico Interview api!' });
});

// get the list with that name (accessed at GET http://localhost:8080/api/list/:name)
//todo: find a way to add a item to the list
router.route('/lists/:name')
.get(function(req, res) {
    List.find({ name: req.params.name },function(err, list) {
        if (err)
        res.send(err);
        //var newItem=new Item({name:'star wars'}); // this is what id like to do
        //list.items.push(9);  // how can i do this?

        res.json({message:list.length+' List found',data:list});
    });
    // List.find({ name: /^pizza/ }, function(){});
})
//polish status code for deletion, maybe return deleted object?
.delete(function(req, res) {
    List.remove({ name: req.params.name },function(err) {
        if (err)
        res.send(err);
        //if(list)
        res.json({status:204})
    });
});

// more routes for our API will happen here


// on routes that end in /list
// ----------------------------------------------------
router.route('/lists')

// create a list (accessed at POST http://localhost:8080/api/lists)
.post(function(req, res) {
    var list = new List({ name: req.body.name });
    list.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('list '+list.name+'has been created');
            res.json({ message: 'list '+list.name+'has been created',data:list });
        }
    });
})
// get all lists (accessed at GET http://localhost:8080/api/lists)
.get(function(req, res) {
    List.find(function (err, lists) {
        if (err) return console.error(err);
        console.log(lists);
        res.json({ message: 'welcome to lists',data:lists });
    });



});


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('port is ' + port);
