const mongoose = require('mongoose');
const headerMiddleware = require('../middleware/headersMiddleware.js')
/*Todas las rutas que se van a usar para la parte de los Headers*/

const Header = mongoose.model('headers')

module.exports = (app) => {
	app.get('/', async (req, res) => {
		console.log("req.cookies", req.cookies);
		res.send('Esto es el Back end hecho por  Miguel Moran( correo: ingmiguelmorangomez@gmail.com MGMike0 en Github) ' +'</br>'+'Son 2 modulos;' +'</br>'+'Uno en el que se pueden crear listas las cuales llevan un titulo o nombre y una descripcion y en el otro modulo se pueden agregar eliminar y editar los elementos que llevaran dicha lista. ' +'</br>'+' ' +'</br>'+' ' +'</br>'+'Para el proyecto use React.js Mongo, express y node ')
	});

	app.get('/api/headers', async (req, res) => {
		const respuesta = await Header.find();
		res.send(respuesta);
	});

	/*Traer Solo Uno Header*/

	app.get('/api/headers/:id', async (req, res) => {
		const respuesta = await Header.findOne({_id: req.params.id});
		res.send(respuesta);
	});

	/*Postear nuevo dato*/
	app.post('/api/headers', 
		headerMiddleware.datosPrimitivos,
		headerMiddleware.datosCompletos,
		async (req, res) => {
		const {nombre, descripcion} = req.body; /*Solo estoy destructurando dos dato pero siempre es bueno declararlo por si se cambia en un futuro*/
		const header = new Header({
			nombre, descripcion
		});
		const respuesta = await header.save();
		res.send(respuesta);
	});
	/*Eliminar una lista buscandolo por el id, los datos de esa lista se quedarian en la tabla pero no se van a poder accesar, en un futuro cambiar flag de activo a desactivado o algo por el estilo*/
	app.delete('/api/headers/:id', async (req, res) =>{
		const respuesta = await Header.deleteOne({_id: req.params.id});
		res.send(respuesta);
	});
};