const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = Schema({
	name: String,
});

module.exports = mongoose.model('Lists' , ListSchema);