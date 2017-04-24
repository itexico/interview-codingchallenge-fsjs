'use strict'

/** Express router providing the items functions
 * @module /lists
 * @requires express
 */

// We import the dependencies
const itemCtrl = require('../controllers/item-controller')
const validate = require('../middlewares/validate')
const joi = require('joi')
const express = require('express')
const router = express.Router()

// This prefix is used in all the routes
let prefix = '/lists/:listId/items'

/**
 * Route serving the creation of a new item.
 * @name /lists/:listId/items
 * @function createNew
 * @memberof module:/lists/:listId/items
 * @inner
 */
router.post(prefix,
    validate({
        params: {
            itemId: joi.string().required()
        },
        body: {
            name: joi.string().required()
        }
    }),
    itemCtrl.createNew
)

/**
 * Route serving the fetch of all the items in a list.
 * @name /lists/:listId/items
 * @function getAll
 * @memberof module:/lists/:listId/items
 * @inner
 */
router.get(prefix,
    validate({
        params: {
            itemId: joi.string().required()
        }
    }),
    itemCtrl.getAll
)

/**
 * Route serving the fetch of a item from a list
 * @name /lists/:listId/items/:itemId
 * @function getOne
 * @memberof module:/lists/:listId/items/:itemId
 * @inner
 */
router.get(prefix + '/:itemId',
    validate({
        params: {
            itemId: joi.string().required()
        }
    }),
    itemCtrl.getOne
)

/**
 * Route serving update of a specific item.
 * @name /lists/:listId/items/:itemId
 * @function updateOne
 * @memberof module:/lists/:listId/items/:itemId
 * @inner
 */
router.put(prefix + '/:itemId',
    validate({
        params: {
            itemId: joi.string().required()
        },
        body: {
            name: joi.string().required()
        }
    }),
    itemCtrl.updateOne
)

/**
 * Route serving to delete a single item.
 * @name /lists/:listId/items/:itemId
 * @function deleteOne
 * @memberof module:/lists/:listId/items/:itemId
 * @inner
 */
router.delete(prefix + '/:itemId',
    validate({
        params: {
            itemId: joi.string().required()
        },
        body: {
            name: joi.string().required()
        }
    }),
    itemCtrl.deleteOne
)

module.exports = router
