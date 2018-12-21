'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = Schema({
    description: String,
    list: { type: Schema.ObjectId, ref: 'List' }
});

module.exports = mongoose.model('Item', ItemSchema);