const express = require ('express');
const app = express();
const path = require('path');
const morgan  = require('morgan');
const {mongoose} = require ('./database/database');


app.set('port',process.env.PORT || 3000);


app.use(morgan('dev'));
app.use(express.json());


app.use('/api/tasks',require('./routes/task.routes'));


app.use(express.static(path.join(__dirname,'public')));


app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
});
