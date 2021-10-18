const mongoose = require("mongoose");

const favoritesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    items: [String],
    owner: String
});
const Favorites = mongoose.model("Favorites", favoritesSchema);

module.exports = Favorites;

