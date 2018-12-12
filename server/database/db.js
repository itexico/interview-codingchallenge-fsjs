const mongoose = require('mongoose');


const URI= 'mongodb://bvalencia:Vmarcelo1125.@ds237932.mlab.com:37932/bv_itexico';

mongoose.connect(URI, { useNewUrlParser: true })
    .then(db =>console.log('db is connected'))
    .catch(err => console.error(err));

module.exports = mongoose