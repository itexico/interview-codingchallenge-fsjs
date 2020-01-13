import * as express from "express";
import { BAD_REQUEST, getStatusText, INTERNAL_SERVER_ERROR, NOT_FOUND } from "http-status-codes";
import isAlpha from "validator/lib/isAlpha";
import isEmpty from "validator/lib/isEmpty";
import { ListInfo } from "../../types/types";
import { printErrors } from "./display-errors";
import { logger } from "./logger";
import { DUPLICATE_ERROR } from "./constants";

/**
 * @description Validates auth header, this middleware just prints out the auth cookie.
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns {void}
 */
export function validateAuthHeader (req: express.Request, res: express.Response, next: express.NextFunction): void {
    const { auth = null } = req.cookies;
    logger.info(`Cookie: *${auth}*`);

    return next();
}

/**
 * This middleware checks if we are getting the expected.
 *
 * @param req
 * @param res
 * @param next
 * @returns list name
 */
export function validateListName (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): void | express.Response {
    const { name = "" } = <ListInfo>req.body;

    if (isEmpty(name)) {
        return res.status(BAD_REQUEST).send({ success: false, message: "Name is required" });
    }
    if (!isAlpha(name)) {
        return res.status(BAD_REQUEST).send({ success: false, message: "Names should only contain letters." });
    }

    next();
}

export function errorHandler (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): express.Response {
    logger.error("Error Handler");
    printErrors(err);
    console.log({ ...err });

    const { code } = err;
    if (code === DUPLICATE_ERROR) {
        return res.status(BAD_REQUEST).send({ success: false, message: `Error ${err.keyValue.name} already exists` });
    }

    if (err.kind === "ObjectId") {
        return res.status(NOT_FOUND).send({ success: false, message: getStatusText(NOT_FOUND) });
    }

    return res.status(INTERNAL_SERVER_ERROR).send({ success: false, message: getStatusText(INTERNAL_SERVER_ERROR) });
}

export function validatesUpdate (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): express.Response | void {
    const { id = "" } = req.params;
    const { name = "" } = req.body;

    if (isEmpty(id)) {
        return res.status(BAD_REQUEST).send({ success: false, message: "id is required" });
    }

    if (isEmpty(name)) {
        return res.status(BAD_REQUEST).send({ success: false, message: "name is required" });
    }
    if (!isAlpha(name)) {
        return res.status(BAD_REQUEST).send({ success: false, message: "name should contain just letters" });
    }

    next();
}
