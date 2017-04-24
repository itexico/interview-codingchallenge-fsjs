'use strict'

const db = require('../lib/mongoose')
const mongoose = require('mongoose')
let Schema = require('mongoose').Schema

let schema = new Schema({
    email: {
        type: String,
        required: true
    }
}, {
  timestamps: true
})

// We store the schema on the model on a variable
let User = db.model('User', schema)

module.exports = User
