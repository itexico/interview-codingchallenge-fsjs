var express = require('express'),
        app = express(),
        port = process.env.PORT || 3000,
        mongoose = require('mongoose'),
        User = require('./models/userModel'),
        Item = require('./models/itemModel'),
        List = require('./models/listModel'),
        bodyParser = require('body-parser')
cookieParser = require('cookie-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/itexico', {useMongoClient: true});

//White list
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(cookieParser());
app.use(function (req, res, next) {
    if (req.cookies.auth) {
        console.log("You sen't this cookie");
        console.log(req.cookies);
    }
    next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var userRoutes = require('./routes/userRoutes');
var itemRoutes = require('./routes/itemRoutes');
var listRoutes = require('./routes/listRoutes');

userRoutes(app);
itemRoutes(app);
listRoutes(app);


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);
