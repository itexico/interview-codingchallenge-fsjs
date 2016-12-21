// server.js

// BASE SETUP
// =============================================================================
var mongoose = require('mongoose');
var List    = require('./models/list');
var Item  = require('./models/item');


mongoose.connect('mongodb://admin:root@jello.modulusmongo.net:27017/upaDyh2u');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var path = require('path');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8081;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// router.get('/', function(res, req) {
//     // res.json({ message: 'welcome to the iTexico Interview api!' });
//      res.sendFile();
// });

router.get('/', function (req,res) {
  // res.sendFile(path.join(__dirname + './../client/app/index.html'));
    res.sendFile(path.resolve('../client/app/index.html'));
});


// middleware to use for all requests
router.use(function(req, res, next) {
    // CORS headers
      res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
      // Set custom headers for CORS
      res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");

      if (req.method === "OPTIONS") {
          return res.status(200).end();
      }

      return next();
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)


// on routes that end in /list
// ----------------------------------------------------
router.route('/lists')
// create a list (accessed at POST http://localhost:8080/api/lists)
// if name is not empty, it will create a list,
//if name is empty it will return error
.post(function(req, res) {

    console.log(req.body.name);
    if(req.body.name){
        var list = new List({ name: req.body.name });
        list.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('list '+list.name+'has been created');

                res.json({ message: 'list '+list.name+'has been created',data:list });
            }
        });
    }else{res.json({error:"name can't be empty"});}

})
// get all lists (accessed at GET http://localhost:8080/api/lists)
.get(function(req, res) {
        // res.header("Access-Control-Allow-Origin", "*");
    List.find(function (err, lists) {
        if (err) return console.error(err);
        console.log(lists);
        // res.json({ message:`${lists.length} lists found`,data:lists.map((item)=>{return{name:item.name,id:item._id}})});
        res.json(lists);
    });

});

// get the list with that name (accessed at GET http://localhost:8080/api/list/:name)
//todo: find a way to add a item to the list
router.route('/lists/:name')
.get(function(req, res) {
    List.find({ name: req.params.name },(err, list)=>{
        if (err)
        res.send(err);
        //var newItem=new Item({name:'star wars'}); // this is what id like to do
        //list.items.push(9);  // how can i do this?
        res.json({message:list.length+' List found',data:list});
    })
})
.put(function(req, res) {
    var itemsList=[];
    //var list.items=list[0].items;
    var item=new Item({n:req.body.name,d:req.body.description});
    console.log('item name recieved is : ',req.body.name);
        console.log('list recieved is : ', req.params.name);
    List.findOne({ name: req.params.name },function(err, list){
        console.log('list items length: ',list.items.length);
        if(list.items && list.items.length>=1){itemsList=list.items;}
        itemsList.push(item);
        console.log('itemslist: ',itemsList,'\n');
        // list.items=itemsList;
        //
        List.findOneAndUpdate({ name: req.params.name }, { items:itemsList} , function(err, list) {
            if (err) throw err;
            // we have the updated user returned to us
            list.items=itemsList;
            console.log(list);
            res.json(list);
        });



    });

    // use our list model to find the bear we want

})
//polish status code for deletion, maybe return deleted object?
.delete(function(req, res) {

    List.remove({ _id: req.params.name },function(err) {
        if (err)
        res.send(err);
        //if(list)
        res.json({status:204})
    });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('port is ' + port);
