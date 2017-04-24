'use strict'

const db = require('../lib/mongoose')
const mongoose = require('mongoose')
let Schema = require('mongoose').Schema

let schema = new Schema({
    name: {
        type: String,
        required: true
    },
    list: {
        ref: 'List',
        type: mongoose.Schema.Types.ObjectId
    }
}, {
        timestamps: true
    })

// We store the schema on the model on a variable
let Item = db.model('Item', schema)

module.exports = Item
