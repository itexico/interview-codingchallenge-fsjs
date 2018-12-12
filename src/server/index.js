
/*Aplicacion web que tenga un listado de temas dentro de cada tema hay un listado de objetos que se necesitan*/

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('./models/Headers.js');
require('./models/Datos.js');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type');
    next();
});

mongoose.connect('mongodb://user:password1@ds131954.mlab.com:31954/itexicomike');

app.use(bodyParser.json());

const headersRoutes = require ('./routes/headerRoutes');
headersRoutes(app);

const datoRoutes = require ('./routes/datosRoutes.js');
datoRoutes(app);


const PORT = process.env.PORT || 5000;
app.listen(PORT);
