'use strict'

// We import the dependencies
const config = require('../config/env')
const info = require('../package.json')

// We create a variable to construct the controller
const mainCtrl = {}

/**
 * Function serving the main page.
 * @name mainPage
 * @memberof module:/
 * @inner
 */
mainCtrl.mainPage = (req, res, next) => {
    res.json({
        api: info.name,
        description: info.description,
        author: info.author,
        version: info.version
    })
}

module.exports = mainCtrl