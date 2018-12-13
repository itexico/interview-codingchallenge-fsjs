const express = require('express');
const morgan = require('morgan');

const path = require('path');

const { mongoose } = require('./database');

const app = express();

// Settings

app.set('port', process.env.PORT || 8001);

// Middlewares

app.use(morgan('dev'));
app.use(express.json());

// Routes

app.use('/api/lists', require('./server/routes/list.routes'));

// Static files

app.use(express.static(path.join(__dirname, 'client/public')));

// Starting server

app.listen(app.get('port'), () => {
    console.log(`Server port ${app.get('port')}`);
});