const express = require('express');
const morgan = require('morgan');

const app = express();

// Settings

app.set('port', process.env.PORT || 8001);

// Middlewares

app.use(morgan('dev'));
app.use(express.json());

// Routes

// Static files

// Starting server

app.listen(app.get('port'), () => {
    console.log(`Server port ${app.get('port')}`);
});