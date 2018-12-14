import morgan from "morgan";
import fs from "fs";
import path from "path";
import rfs from "rotating-file-stream";

import { Config } from "../../config";

const env = Config("env");
const root = Config("root");

let middleware;

if (env === "production") {
  const logDirectory = path.join(root, "logs");

  /* eslint-disable-next-line */
  const dir = fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

  const accesLogStream = rfs("access.log", {
    interval: "id",
    path: logDirectory
  });

  middleware = morgan("combined", {
    stream: accesLogStream
  });
}

export default middleware || morgan("dev");
