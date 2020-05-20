import { listRouter } from "./list";

export const route = (app) => {
  app.use("/lists", listRouter);

  app.use((error, req, res, next) => {
    const defaultErrorMessage = "Something went wrong. Please try again.";
    res.status(500).json({ message: error.message || defaultErrorMessage });
  });
};
