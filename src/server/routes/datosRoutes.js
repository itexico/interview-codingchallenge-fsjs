const mongoose = require('mongoose');

/*Todas las rutas que se van a usar para la parte de los Datos o elementos de las listas*/
const datosMiddleware = require('../middleware/datosMiddleware.js');

const Datos = mongoose.model('datos')

module.exports = (app) => {
	/*Se buscan los datos separados dependiendo que padre tienen, ya que asi se hace la seleccion de que tipo de dato lleva cada uno, funciona como si fuera una base de datos relacionada SQL, mySQL, Oracle ...*/
	app.get('/api/datos/:id', async (req, res) => {
		const respuesta = await Datos.find({IDPadre: `${req.params.id}`});
		res.send(respuesta);
	});
	/*Postear un nuevo dato en una lista , el Header se da por el ID en el Link*/
	app.post('/api/datos/:id',
		datosMiddleware.datosPrimitivos,
		datosMiddleware.datosCompletos,
		async (req, res) => {
		const {nombre} = req.body; 
		const IDPadre = req.params.id;
		const datos = new Datos({
			nombre, IDPadre
		});
		const respuesta = await datos.save();
		res.send(respuesta);
	});

	/*Modificar un dato*/

	app.post('/api/datos/:idPadre/edit', 
		datosMiddleware.datosPrimitivos,
		datosMiddleware.datosCompletos,
		async (req, res) => {
		const {nombre, idHijo} = req.body; 
		const IDPadre = req.params.idPadre;
		
		const respuesta = await Datos.findOneAndUpdate(
			{ _id: idHijo },
			{nombre, IDPadre},
			{new:true}
			).exec();

		res.send(respuesta);
	});

	/*Delete*/
	app.delete('/api/datos/:id', async (req, res) =>{
		const respuesta = await Datos.deleteOne({_id: req.params.id});
		res.send(respuesta);
	});

	
};