import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const listModel = new Schema({
    name: { type: String },
    // favs: { type: Array}
})
export default mongoose.model('lists', listModel)