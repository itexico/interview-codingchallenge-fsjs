const mongoose = require('mongoose');

const URI = 'mongodb+srv://admin:admin123@area-snhw9.mongodb.net/test?';

mongoose.connect(URI)
    .then(db => console.log('conected'))
    .catch(err => console.log(err));

module.exports = mongoose;