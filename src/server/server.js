const express = require( 'express' );
const mongoose = require( 'mongoose' );
const cors = require( 'cors' );
const detectPort = require( 'detect-port' );
const cookieParser = require( 'cookie-parser' );
const cookiesMiddleware = require( './general/cookies' );

require( 'dotenv' ).config();

async function startServer({ port = process.env.SERVER_PORT } = {}) {
  // eslint-disable-next-line require-atomic-updates
  port = port || ( await detectPort( 8888 ) );
  const app = express();
  app.use( cors() );
  app.use( express.json() );
  app.use( cookieParser() );

  // set a cookie
  app.use( cookiesMiddleware );

  if( process.env.TEST_DATABASE_NEEDED !== 'NO' ) {

    const databaseURL = process.env.NODE_ENV === 'test' ?
      `${process.env.DATABASE_URL_TEST}${process.env.JEST_WORKER_ID}` :
      process.env.DATABASE_URL;

    mongoose.connect( databaseURL, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on( 'error', err => console.error( 'DB error', err ) );
    db.once( 'open', () => console.log( 'Connected to db' ) );
  }

  const listsRoutes = require( './routes/lists' );
  const itemsRoutes = require( './routes/items' );
  const authsRoutes = require( './routes/auth' );

  app.use( '/list', listsRoutes );
  app.use( '/item', itemsRoutes );
  app.use( '/auth', authsRoutes );

  return new Promise( resolve => {
    const server = app.listen( port, () => {
      console.log( `Listening on port ${server.address().port}` );
      const originalClose = server.close.bind( server );
      server.close = () => {
        return new Promise( resolveClose => {
          originalClose( resolveClose );
        });
      };
      resolve( server );
    });
  });
}

console.log( 'process.env.NODE_ENV: ', process.env.NODE_ENV );
if ( process.env.NODE_ENV !== 'test' ) {
  startServer({ port: process.env.PORT });
}

module.exports = startServer;
