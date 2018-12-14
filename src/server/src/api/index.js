/**
 * TODO: Implement auth middleware to look for a X-authoritation-api-token
 */
import { Router } from "express";

import routes from "./components";

const apiRoutes = Router();

apiRoutes.use("/api", routes);

export default apiRoutes;
