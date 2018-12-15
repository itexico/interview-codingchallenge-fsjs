const http = require('http');
const app = require('./app');

// setup port and server
const port = process.env.PORT || 3000;
const server = http.createServer(app);

// launch server to listen to specific port
server.listen(port);