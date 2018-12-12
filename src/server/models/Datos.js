const mongoose = require('mongoose');
const { Schema } = mongoose;

const datosSchema = new Schema({
	IDPadre: String,
	nombre : String
});

mongoose.model('datos', datosSchema)