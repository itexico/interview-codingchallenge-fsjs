import mongoose from 'mongoose';

const favoritesSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    _id: String,
    title: { type: String, required: true },
    items: [String],
    owner: String
});

var Favorites = mongoose.model("Favorites", favoritesSchema);

export default Favorites;
