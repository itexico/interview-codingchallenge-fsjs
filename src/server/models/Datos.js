const mongoose = require('mongoose');
const { Schema } = mongoose;

const headerSchema = new Schema({
	IDPadre: String,
	nombre : String
});

mongoose.model('datos', headerSchema)