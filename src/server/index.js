const mongoose = require('mongoose');

require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE, {
  useMongoClient: true
});

mongoose.Promise = global.Promise;

mongoose.connection.on('error', err => {
  console.error('There were some errors: ', err);
});

const app = require('./app');

app.set('port', process.env.PORT || 7777);

const server = app.listen(app.get('port'), () => {
  console.log(`Application running on: ${server.address().port}`);
});
