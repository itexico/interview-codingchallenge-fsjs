'use strict'

const DBConfig = require('./config/DatabaseConfig');
const mongoose = require('mongoose');
const app      = require ('./app');
const PORT     = process.env.PORT || 3000; //If environment variable exists will fill for the port instead of 3000

mongoose.Promise = global.Promise;

mongoose.connect(DBConfig.connectionString, {useNewUrlParser: true})
        .then(() => {
            console.log('Connection to DB successful');  
            //Loading server
            app.listen(PORT, () => console.log('Server running on port '+ PORT));
        })
        .catch((err) => console.log(err));