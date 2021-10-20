import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import favoritesRoutes from "./routes/favoritesRoutes.js"; // routes 

const app = express();
dotenv.config()

app.use(bodyParser.json({ limit: "30mb", extended: true }));// Body parser middleware
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors()); //To prevent CORS errors

//App routes to handle requests
app.use("/favorites", favoritesRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT, () =>
        console.log(`Connection is stablished and running on ${PORT}`))) //Checking the connection to db
    .catch((err) => console.log(err));