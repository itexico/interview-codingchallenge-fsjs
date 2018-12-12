const express = require('express');
const morgan = require('morgan');
const path= require('path');
const pwd = '/home/blanca/Desktop/itexico/challenge/interview-codingchallenge-fsjs/client/src';

const { mongoose } = require('./database/db')

const app = express();


app.set('port', process.env.PORT || 3000);


app.use(morgan('dev'));
app.use(express.json());

app.use('/test', require('./database/routes'));

app.use(express.static(path.join(__dirname + 'client/public')));
//console.log(__dirname, 'client/public')




app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
