const express      = require("express");
const bodyParser   = require("body-parser");
const app          = express();
const routes       = require("./routes");

// Body parser is being started
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Setting CORS and HEADERS permits
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Cookies, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Mountin routes for API
app.use("/api", routes);

// Handling 404 requests
app.use((req, res) => {
    const HttpResponse = new (require("./system/HttpResponse"))(res);
    HttpResponse.notFound(req.url);
});

module.exports = app;