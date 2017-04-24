'use strict'

/** Express router providing the lists functions
 * @module /lists
 * @requires express
 */

// We import the dependencies
const listCtrl = require('../controllers/list-controller')
const validate = require('../middlewares/validate')
const joi = require('joi')
const express = require('express')
const router = express.Router()

// This prefix is used in all the routes
let prefix = '/lists'

/**
 * Route serving the creation of a new list.
 * @name /lists
 * @function createNew
 * @memberof module:/lists
 * @inner
 */
router.post(prefix,
    validate({
        body: {
            name: joi.string().required()
        }
    }),
    listCtrl.createNew
)

/**
 * Route serving the fetch of all the lists from a user.
 * @name /lists
 * @function getAll
 * @memberof module:/lists
 * @inner
 */
router.get(prefix,
    listCtrl.getAll
)

/**
 * Route serving the fetch of a unique list from a user
 * @name /lists/:id
 * @function getOne
 * @memberof module:/lists
 * @inner
 */
router.get(prefix + '/:listId',
    validate({
        params: {
            listId: joi.string().required()
        }
    }),
    listCtrl.getOne
)

/**
 * Route serving update of a specific list.
 * @name /lists/:id
 * @function updateOne
 * @memberof module:/lists
 * @inner
 */
router.put(prefix + '/:listId',
    validate({
        params: {
            listId: joi.string().required()
        },
        body: {
            name: joi.string().required()
        }
    }),
    listCtrl.updateOne
)

/**
 * Route serving the generation of a unique identifier.
 * @name /cookies
 * @function createId
 * @memberof module:/cookies
 * @inner
 */
router.delete(prefix + '/:id',
    listCtrl.deleteOne
)

module.exports = router
