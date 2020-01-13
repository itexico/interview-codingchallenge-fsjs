import * as express from "express";
import { getStatusText, NOT_ACCEPTABLE } from "http-status-codes";

/**
 * Default format response.
 *
 * @template {*} T - type of data.
 * @param {import("express").Response} res - HTTP Response.
 * @param {T} data - payload of data requested by the client.
 * @param {number} statusCode - number that tells the client what was the result of its petition.
 * @returns response
 */
export function apiResponse<T> (res: express.Response, data: T, statusCode: number): express.Response {
    return res.format({
        json: () => {
            res.type("application/json");
            res.status(statusCode).send({
                success: true,
                message: getStatusText(statusCode),
                result: data,
            });
        },
        default: () => {
            res.status(NOT_ACCEPTABLE).send({
                success: false,
                message: getStatusText(NOT_ACCEPTABLE),
            });
        },
    });
}
