'use strict'

// We import the dependencies
const config = require('../config/env')
const info = require('../package.json')
const User = require('../models/user')

// We create a variable to construct the controller
const userCtrl = {}

/**
 * Function that generates of a unique identifier.
 * @name createId
 * @memberof module:/cookies
 * @inner
 */
userCtrl.createId = (req, res, next) => {
    // We create a new user based on the email
    User.create({ email: req.body.email, lists: [] })
        .then((user) => {
            // We set a cookie with the user ID
            res.cookie('user', user._id)
            res.json({ cookie: user._id })
        })
        .catch((err) => {
            // We send the error to the error handler
            return next(err)
        })
}

module.exports = userCtrl
