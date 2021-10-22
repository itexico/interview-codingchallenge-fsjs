import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import favoritesRoutes from "./routes/favoritesRoutes.js"; // routes 
import userRoutes from "./routes/userRoutes.js";

const app = express();
dotenv.config();

const { SERVER_PORT, CONNECTION_URL } = process.env;

app.use(bodyParser.json({ limit: "30mb", extended: true }));// Body parser middleware
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors()); //To prevent CORS errors

//App routes to handle requests
app.use("/favorites", favoritesRoutes);
app.use("/user", userRoutes);

const PORT = SERVER_PORT || 5000;

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () =>
        console.log(`Connection is stablished and running on ${PORT}`))) //Checking the connection to db
    .catch((err) => console.log(err));