import http from "http";
import { expressApp } from "./express";
import { connection } from "./models/bd";
import { PORT } from "./utils/constants";
import { logger } from "./utils/logger";

connection().then((mongoose) => {
    const conn = mongoose.connection;
    conn.once("error", (error: Error) => {
        console.log("error: ", error);
        logger.error("error connecting");
    });

    const server = http.createServer(expressApp());

    logger.debug("db connected");

    server.listen(Number(PORT), () => {
        logger.info("server running!");
        logger.info(`mode: ${process.env.NODE_ENV}`);
        logger.info(`at: localhost:${process.env.PORT}`);
    });
});
