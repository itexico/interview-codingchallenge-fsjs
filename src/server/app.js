import express from "express";

import { route } from "./routes";

const app = express();
route(app);

export default app;
