import { listRouter } from "./list";

export const route = (app) => {
  app.use("/lists", listRouter);
};
