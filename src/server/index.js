'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3200;

mongoose.connect('mongodb://localhost:27017/itexico', { useNewUrlParser: true}, (err, res) => {
    if (err){
        throw err;
    } else {
        console.log("Database running...");

        app.listen(port, () => {
            console.log("Server API REST listening http://localhost:" + port);
        })
    }
});