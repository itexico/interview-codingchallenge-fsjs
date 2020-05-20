import { listRouter } from "./list";
import { itemsRouter } from "./item";

export const route = (app) => {
  app.use("/lists", listRouter);
  app.use("/items", itemsRouter);

  app.use((error, req, res, next) => {
    const defaultErrorMessage = "Something went wrong. Please try again.";
    res.status(500).json({ message: error.message || defaultErrorMessage });
  });
};
