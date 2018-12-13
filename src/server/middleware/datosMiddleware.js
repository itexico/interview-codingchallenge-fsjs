module.exports = (() => {
	const datosCompletos = (req, res, next) =>{
		const { nombre, IDPadre } = req.body;

		if(nombre.trim() == '') res.send('Falta Nombre');
		if(!IDPadre.trim()) res.send('Falta ID de lista');

		next();
	};

	const datosPrimitivos = (req, res, next) =>{
		const {nombre, IDPadre} = req.body;
		if(typeof(nombre) != "string") res.send("validar nombre");
		if(typeof(IDPadre) != "string") res.send("Validar Tipo de Dato ID");

		next();
	}

	return{
		datosPrimitivos,
		datosCompletos
	}
})();