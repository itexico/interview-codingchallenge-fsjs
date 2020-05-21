import { listRouter } from "./lists";
import { itemsRouter } from "./items";

export const route = (app) => {
  app.use("/lists", listRouter);
  app.use("/items", itemsRouter);
};
