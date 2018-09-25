import express from 'express';
import FavoritesRouter from './routes/FavoritesRouter';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';


const app = express();
const port = process.env.PORT || 5656;


//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(allowCrossDomain);

//API Routes
app.use('/api/Lists', FavoritesRouter);

// Connecting to the database
const db = mongoose.connect('mongodb://Ambar:dbFavs123@ds259912.mlab.com:59912/favsdb',{useNewUrlParser: true});

//Running the server
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})



function allowCrossDomain(req, res, next) {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    var origin = req.headers.origin;
    if(typeof origin !== "undefined"){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
  
    
  

  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
}



//DOCUMENTATION
/*RESTful API: 
      https://dev.to/aurelkurtula/building-a-restful-api-with-express-and-mongodb--3mmh
      https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue*/

