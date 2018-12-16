const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;