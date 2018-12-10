const mongoose = require('mongoose');
const { Schema } = mongoose;

const ListSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: { type: String, required: true },
    items : [{ type: Schema.Types.ObjectId, ref: 'Item' }]
});

const ItemSchema = new Schema({
    _owner: { type: Schema.Types.ObjectId, ref: 'List' },
    title: { type: String, required: true },
});

module.exports = mongoose.model('List', ListSchema);
module.exports = mongoose.model('Item', ItemSchema);