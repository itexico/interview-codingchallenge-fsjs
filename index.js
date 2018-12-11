const express = require('express');
const morgan = require('morgan');
const path= require('path');

const { mongoose } = require('./server/database/db')

const app = express();


app.set('port', process.env.PORT || 3000);


app.use(morgan('dev'));
app.use(express.json());

app.use('/test', require('./server/database/routes'));

app.use(express.static(path.join(__dirname,'client/src/public')));

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
