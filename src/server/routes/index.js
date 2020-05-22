import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

import { listRouter } from "./lists";
import { itemsRouter } from "./items";
import { authenticated } from "../middlewares/auth";

export const route = (app) => {
  app.use(cors());
  app.use(cookieParser());
  app.use(bodyParser.json());

  app.use("/lists", authenticated, listRouter);
  app.use("/items", authenticated, itemsRouter);
};
