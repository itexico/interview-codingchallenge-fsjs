var mongoose = require('mongoose')
        , Schema = mongoose.Schema;

var FavStuffSchema = new Schema({
    fav_stuff_name: {
        type: String,
        unique: true,
        required: true,
        dropDups: true
    },
    fav_stuff_list: {
        type: Array,
        unique: false,
        required: true
    }
});

exports.favorite_stuff = mongoose.model('favorite_stuff', FavStuffSchema);