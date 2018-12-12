
/*Aplicacion web que tenga un listado de temas dentro de cada tema hay un listado de objetos que se necesitan*/

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('./models/Headers.js');
require('./models/Datos.js');

const app = express();

mongoose.connect('mongodb://user:password1@ds131954.mlab.com:31954/itexicomike');

app.use(bodyParser.json());

const headersRoutes = require ('./routes/headerRoutes');
headersRoutes(app);

const datoRoutes = require ('./routes/datosRoutes');
datoRoutes(app);


const PORT = process.env.PORT || 5000;
app.listen(PORT);
