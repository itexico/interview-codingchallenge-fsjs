const mongoose = require('mongoose');
const { Schema } = mongoose;

const headerSchema = new Schema({
	nombre: String,
	descripcion : {
		type:String,
		default: ""
	}
});

mongoose.model('headers', headerSchema)