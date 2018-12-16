const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        }
    ]
});

const List = mongoose.model('List', listSchema);

module.exports = List;