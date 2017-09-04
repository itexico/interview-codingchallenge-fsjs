'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    description: {
        type: String,
        required: 'Description is required.'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    _creator: {type: Schema.ObjectId, ref: 'Lists'}
});

ItemSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

ItemSchema.virtual('list_id').get(function () {
    return this._creator;
});

ItemSchema.set('toJSON', {
    virtuals: true
});



module.exports = mongoose.model('Items', ItemSchema);
