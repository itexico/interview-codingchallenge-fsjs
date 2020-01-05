import mongoose from "mongoose";
import { logger } from "../utils/logger";

export function connection () {
    logger.debug("connection");
    const url = `mongodb://localhost:27017/list-interview`;
    return mongoose
        .connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
        .then((result) => {
            return result;
        })
        .catch((error) => {
            throw error;
        });
}
