import { Router } from "express";

import { Routes as ListRoutes } from "./List";
import { Routes as SessionRoutes } from "./Session";

const componentsRouter = Router();

componentsRouter.use("/", SessionRoutes);
componentsRouter.use("/lists", ListRoutes);

export default componentsRouter;
