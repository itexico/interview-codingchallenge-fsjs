import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({}, { timestamps: true });
export const List = mongoose.model('list', listSchema);
