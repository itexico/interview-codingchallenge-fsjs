import "core-js/stable";
import "regenerator-runtime/runtime";

import express from "express";
import bodyParser from "body-parser";

import { route } from "./routes";

const app = express();

app.use(bodyParser.json());
route(app);

export default app;
