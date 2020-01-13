import * as winston from "winston";

const { format } = winston;

const custom = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        verbose: 3,
        debug: 4,
        http: 5,
    },
    colors: {
        error: "red",
        warn: "orange",
        info: "white bold yellow",
        verbose: "blue",
        debug: "green",
        http: "pink",
    },
};
export const myFormat = format.printf((info) => `[${info.timestamp}] [${info.level}] => ${info.message}`);

export const logger = winston.createLogger({
    levels: custom.levels,
    format: format.combine(
        format.label({ label: "order-api errors" }),
        format.timestamp(),
        format.colorize({ colors: custom.colors }),
        format.json(),
        myFormat
    ),

    transports: [
        new winston.transports.File({ filename: "info.log", level: "info" }),
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.Console(),
    ],
});
