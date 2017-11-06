const express = require('express');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const { showErrors } = require('./controllers/errorsController');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'static')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cookieParser());

app.use((req, res, next) => {
  if (!req.cookies.auth) return res.json({ message: 'missing cookie' });
  console.log('Auth cookie value: ', req.cookies.auth);
  next();
});

app.use('/api', routes);

app.use(showErrors);

module.exports = app;
