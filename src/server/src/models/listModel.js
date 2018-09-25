import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const listModel = new Schema({
    name: { type: String },
    favs: { type: String}
})
export default mongoose.model('lists', listModel)