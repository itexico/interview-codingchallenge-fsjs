const express = require('express');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'static')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cookieParser());

module.exports = app;
