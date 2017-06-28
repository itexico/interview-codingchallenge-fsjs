const  express = require('express');
const  path = require('path');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/icfsjs');

let port = 3000;
let app = express();

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json())

app.set('views', './src/client/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use("/node_modules", express.static(path.resolve(__dirname, '../../node_modules')));
app.use("/app", express.static(path.resolve(__dirname, '../client/app')));

app.use("/*.html", function (req, res) {
    res.render(req.params[0] + ".html");
});

var fav_stuff = require('./controllers/fav_stuff')
app.use('/', fav_stuff);

let server = app.listen(port, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("Express app listening on port:" + port);
});
