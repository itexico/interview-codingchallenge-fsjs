'use strict'

/** Express router providing main page
 * @module /
 * @requires express
 */

// We import the dependencies
const mainCtrl = require('../controllers/main-controller')
const express = require('express')
const router = express.Router()

// This prefix is used in all the routes
let prefix = '/'

/**
 * Route serving the main page.
 * @name /
 * @function mainPage
 * @memberof module:/
 * @inner
 */
router.get(prefix, mainCtrl.mainPage)

module.exports = router
