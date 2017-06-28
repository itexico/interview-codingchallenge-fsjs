const  express = require('express');

var middlewares = require("./middlewares");
var controllers = require('./controllers');
var api_rest = require('./controllers/api');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
let port = 3000;
let app = express();
/* Connect with Database */
mongoose.connect('mongodb://localhost/icfsjs');

app.set('views', './src/client/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
// parse application/x-www-form-urlencoded 
app.use(middlewares.bodyparser);
// parse application/json 
app.use(middlewares.json_parse);
// parse cookies
app.use(middlewares.cookie_parser)
app.use("/node_modules", middlewares.node_modules_dir);
app.use("/app", middlewares.app_dir);
app.use("/*.html",middlewares.renderhtml);
app.use("/",middlewares.check_auth_cookie);

/* include routes for controller and API REST */
app.use('/', controllers);
app.use('/', api_rest);

let server = app.listen(port, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("Express app listening on port:" + port);
});
