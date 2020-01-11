import * as mongoose from "mongoose";
import { logger } from "../utils/logger";
import { listFactory } from "./list-model";
import { itemsFactory } from "./item-model";

export const Lists = listFactory(mongoose);
export const Items = itemsFactory(mongoose);

export async function database (): Promise<void> {
    logger.debug("connection to db");
    const url = `mongodb://localhost:27017/list-interview`;

    await mongoose.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    });
    const { connection } = mongoose;
    connection.once("connect", () => logger.info("db connection"));
    connection.on("error", (err) => Object.keys(err).forEach((key) => logger.error(err[key])));
}
