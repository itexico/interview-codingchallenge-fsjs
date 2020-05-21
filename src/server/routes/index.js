import { listRouter } from "./lists";
import { itemsRouter } from "./items";
import { authenticated } from "../middlewares/auth";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

export const route = (app) => {
  app.use(cookieParser());
  app.use(bodyParser.json());

  app.use("/lists", authenticated, listRouter);
  app.use("/items", authenticated, itemsRouter);
};
