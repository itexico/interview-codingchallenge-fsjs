module.exports = (() => {
	const datosCompletos = (req, res, next) =>{
		const { nombre } = req.body;

		if(!nombre.trim()) res.send('Falta Nombre');

		next();
	};

	const datosPrimitivos = (req, res, next) =>{
		const {nombre, descripcion} = req.body;
		if(typeof(nombre) != "string") res.send("Validar tipo de Dato Nombre");
		if(typeof(descripcion) != "string") res.send("Validar tipo de Dato Descripcion");

		next();
	}

	return{
		datosPrimitivos,
		datosCompletos
	}
})();