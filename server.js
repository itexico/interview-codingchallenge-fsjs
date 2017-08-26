const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Lists = require('./src/server/models/lists.js');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

app.post('/api/lists', (req, res) => {

	console.log(req.body.name)

	let list = new Lists();
	list.name = req.body.name;

	list.save((err, listSave) => {
		if (err) res.status(500).send({message:`Error at save list: ${err}`})

		res.status(200).send({list: listSave})
	})
})


mongoose.connect('mongodb://localhost:27017/lists',(err , res) => {
	if(err){
		return console.log(`Error: ${err}`);
	}
	
	console.log('Conexión a la base de datos establecida');

	app.listen(port , () =>{
	console.log(`Listening on port ${port}`);
	});
});



