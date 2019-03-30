import mongoose, { createConnection } from 'mongoose';
var db = createConnection('mongodb://localhost:27017/myListDb');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database Connected.');
});

export default this;