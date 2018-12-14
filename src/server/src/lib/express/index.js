import express from "express";
import forceSSL from "express-force-ssl";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";
import helmet from "helmet";

import morgan from "../morgan";
import getConfig from "../../config/config";
import errorHandler from "./errorHandler";
import responseHandler from "./responseHandler";

const env = getConfig("env");

export default routes => {
  const app = express();

  app.use(cors());
  app.use(compression());

  if (env === "production") {
    app.set("forceSSLOptions", {
      enable301Redirects: false,
      trustXFPHeader: true
    });
    app.use(forceSSL);
  }

  app.use(morgan);

  app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );

  app.use(bodyParser.json());
  app.use(helmet());
  app.use(
    helmet.hidePoweredBy({
      setTo: "PHP 7.1.11"
    })
  );

  app.use(routes);

  Object.keys(errorHandler).forEach(key => {
    app.use(errorHandler[key]);
  });

  return app;
};

export const responses = responseHandler;
