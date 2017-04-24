'use strict'

/** Express router providing the cookies unique identifier
 * @module /cookies
 * @requires express
 */

// We import the dependencies
const userCtrl = require('../controllers/user-controller')
const validate = require('../middlewares/validate')
const joi = require('joi')
const express = require('express')
const router = express.Router()

// This prefix is used in all the routes
let prefix = '/cookies'

/**
 * Route serving the generation of a unique identifier.
 * @name /cookies
 * @function createId
 * @memberof module:/cookies
 * @inner
 */
router.post(prefix,
    validate({
        body: {
            email: joi.string().email().required()
        }
    }),
    userCtrl.createId
)

module.exports = router
