'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ListSchema = Schema({
    name: String
});

module.exports = mongoose.model('List', ListSchema);