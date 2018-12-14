import http from "http";
import chalk from "chalk";

import getConfig from "./config/config";

import { mongoose, express } from "./lib";
import api from "./api";

const { env, mongo, port, ip } = getConfig();

const app = express(api);

if (env === "development" || env === "test") {
  const server = http.createServer(app);
  setImmediate(() => {
    server.listen(port, ip, () => {
      /* eslint-disable-next-line */
      console.log(
        chalk.cyan(`Express server in ${env} mode listening at 
      http://${ip}:${port}`)
      );
    });
  });
}

export default app;
