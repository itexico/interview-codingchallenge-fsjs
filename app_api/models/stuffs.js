var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    createdOn: {
        type: Date,
        "default": Date.now
    }
});

var stuffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    items: [itemSchema]
});

mongoose.model('Stuff', stuffSchema);
