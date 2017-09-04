'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ListSchema = new Schema({
    description: {
        type: String,
        required: 'Description is required.'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    items : [{ type: Schema.ObjectId, ref: 'Items' }]
});

ListSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

ListSchema.set('toJSON', {
    virtuals: true
});


module.exports = mongoose.model('Lists', ListSchema);
