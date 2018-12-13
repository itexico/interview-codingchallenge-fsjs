const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    title: { type: String, required: true },
});

const ListSchema = new Schema({
    title: { type: String, required: true },
    items : [ItemSchema]
});

module.exports = mongoose.model('List', ListSchema);