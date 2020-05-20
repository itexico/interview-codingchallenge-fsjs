import express from "express";
import { route } from "./controllers";

const PORT = 3000;

const app = express();

route(app);

app.listen(PORT, () => `Itexico API on http://localhost:${PORT}`);
