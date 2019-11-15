const mongoose = require( 'mongoose' );

const listSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  items: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Item' } ]
});
module.exports = mongoose.model( 'List', listSchema );