import "core-js/stable";
import "regenerator-runtime/runtime";

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import { route } from "./controllers";

const PORT = 3000;
const DB_USER = "developer";
const DB_PASSWORD = "developer2020";

mongoose.connect(
  `mongodb://${DB_USER}:${DB_PASSWORD}@ds257564.mlab.com:57564/itexico-interview-cc`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const app = express();

app.use(bodyParser.json());
route(app);

app.listen(PORT, () => `Itexico API on http://localhost:${PORT}`);

export default app;
