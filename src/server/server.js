const express = require( 'express' );
const app = express();
const mongoose = require( 'mongoose' );
const cors = require( 'cors' );

require( 'dotenv' ).config();

const port = process.env.SERVER_PORT || 3000;

mongoose.connect( process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on( 'error', err => console.error( 'DB error', err ) );
db.once( 'open', () => console.log( 'Connected to db' ) );

app.use( cors() );
app.use( express.json() );

const listsRoutes = require( './routes/lists' );
app.use( '/list', listsRoutes );

app.listen( port, () => console.log( 'Server running on port: ' + port ) );