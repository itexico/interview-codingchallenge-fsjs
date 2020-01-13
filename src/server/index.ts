import * as http from "http";
import { expressApp } from "./express";
import { database } from "./models";
import { logger } from "./utils/logger";

export const server = http.createServer(expressApp());


server.listen(5000, async () => {

    await database();
    logger.info("server running!");
    logger.info(`mode: ${process.env.NODE_ENV}`);
    logger.info(`at: localhost:${process.env.PORT}`);
});
