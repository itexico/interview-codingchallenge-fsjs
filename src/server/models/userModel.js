'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required.'
    },
    last_name: {
        type: String,
        required: 'Last name is required.'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

UserSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

UserSchema.set('toJSON', {
    virtuals: true
});


module.exports = mongoose.model('Users', UserSchema);
