const  express = require('express');
const  path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

module.exports = {
    bodyparser:bodyParser.urlencoded({ extended: false }),
    json_parse:bodyParser.json(),
    node_modules_dir:express.static(path.resolve(__dirname, '../../../node_modules')),
    app_dir:express.static(path.resolve(__dirname, '../../client/app')),
    cookie_parser: cookieParser(),
    renderhtml:function (req,res){
        res.render(req.params[0] + ".html");
    },
    check_auth_cookie:function(req,res,next){
        if (typeof req.cookies.auth != "undefined"){
            console.log("auth cookie = " + req.cookies.auth);
        }else{
            console.log("auth cookie is not defied");
        }
        
        next();
    }
}