// server.js

// BASE SETUP
// =============================================================================

var mongoose   = require('mongoose');
mongoose.connect('mongodb://admin:root@jello.modulusmongo.net:27017/upaDyh2u'); // connect to our database

var List    = require('./models/list');

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
    res.json({ message: 'welcome to the list api!' });
});


router.get('/list', function(req, res) {
    res.json({ message: 'welcome to lists' });
});
// more routes for our API will happen here


// on routes that end in /list
// ----------------------------------------------------
router.route('/list')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        console.log('got to lists');

        var list = new List();      // create a new instance of the List model
        list.name = req.body.name;  // set the list's name (comes from the request)
        console.log('list name: '+list.name);

        // save the list and check for errors
        list.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'List '+list.name+' created!' });
        });

    });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('port is ' + port);
