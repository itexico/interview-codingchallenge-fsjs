'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var StuffSchema = new Schema({
    name: {
        type: String,
        Required: 'Please enter some favorite stuff you love.'
    },
    updated: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String
    }
});

module.exports = mongoose.model('Stuffs', StuffSchema);