'use strict'

// We import the dependencies
const config = require('../config/env')
const info = require('../package.json')
const List = require('../models/list')
const User = require('../models/user')

// We create a variable to construct the controller
const listCtrl = {}

/**
 * Function that creates a list.
 * @name createNew
 * @memberof module:/lists
 * @inner
 */
listCtrl.createNew = (req, res, next) => {
    // If there's no cookie with the user name we throw an error
    if (!req.cookies.user) throw new Error('Unauthorized')

    // We create a list
    List.create({ name: req.body.name, user: req.cookies.user })
        .then((result) => {
            res.status(201).json(result)
        })
        .catch((err) => {
            // We send the error to the error handler
            return next(err)
        })
}

/**
 * Function that gets all the lists from the user
 * @name getAll
 * @memberof module:/lists
 * @inner
 */
listCtrl.getAll = (req, res, next) => {
    // If there's no cookie with the user name we throw an error
    if (!req.cookies.user) throw new Error('Unauthorized')

    // We get all the user lists
    List.find({ user: req.cookies.user })
        .then((lists) => {
            res.status(200).json(lists)
        })
        .catch((err) => {
            // We send the error to the error handler
            return next(err)
        })
}

/**
 * Function that gets the specific list
 * @name getOne
 * @memberof module:/lists/:id
 * @inner
 */
listCtrl.getOne = (req, res, next) => {
    // If there's no cookie with the user name we throw an error
    if (!req.cookies.user) throw new Error('Unauthorized')

    // We get all the user lists
    List.findOne({ _id: req.params.listId })
        .then((list) => {
            res.status(200).json(list)
        })
        .catch((err) => {
            // We send the error to the error handler
            return next(err)
        })
}

/**
 * Function that updated a specific list.
 * @name updateOne
 * @memberof module:/lists/:id
 * @inner
 */
listCtrl.updateOne = (req, res, next) => {
    // If there's no cookie with the user name we throw an error
    if (!req.cookies.user) throw new Error('Unauthorized')

    // We update the name of the list
    List.findOneAndUpdate({ _id: req.params.listId }, { name: req.body.name }, { new: true })
        .then((list) => {
            res.status(200).json(list)
        })
        .catch((err) => {
            // We send the error to the error handler
            return next(err)
        })
}

/**
 * Function that deletes a specific list.
 * @name deleteOne
 * @memberof module:/lists/:id
 * @inner
 */
listCtrl.deleteOne = (req, res, next) => {
    // If there's no cookie with the user name we throw an error
    if (!req.cookies.user) throw new Error('Unauthorized')

    // We update the name of the list
    List.findOneAndRemove({ _id: req.params.listId })
        .then((list) => {
            res.json({})
        })
        .catch((err) => {
            // We send the error to the error handler
            return next(err)
        })
}

module.exports = listCtrl
