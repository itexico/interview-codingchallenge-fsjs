const mongoose = require('mongoose');

const URI = 'mongodb://localhost/favorite';

mongoose.connect(URI)
    .then(db => console.log('conected'))
    .catch(err => console.log(err));

module.exports = mongoose;