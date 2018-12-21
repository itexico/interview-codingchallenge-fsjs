'use strict'

exports.cookieAuth = function(req, res, next) {
    if (!req.cookies) {
        res.cookie('auth', 'value');
    }

    console.log(req.cookies);

    next();
}