import bodyParser from "body-parser";
import compression from "compression";
import cookie from "cookie-parser";
import cors from "cors";
import express from "express";
import { routes } from "./routes";
import { errorHandler, validateAuthHeader } from "./utils/middlewares";

/**
 * Generates the express configuration for the server.
 *
 * @returns {import("express").Application} express - express config.
 */
export function expressApp (): express.Application {
    const app: express.Application = express();
    if (process.env.NODE_ENV === "production") {
        app.use(compression());
    }
    app.use(cors());
    app.use(cookie());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true, limit: "5m" }));
    app.use(validateAuthHeader);
    app.use(routes());
    app.use(errorHandler);

    return app;
}
