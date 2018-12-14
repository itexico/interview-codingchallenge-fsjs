import { validationResult } from "express-validator/check";
import { matchedData } from "express-validator/filter";

import { Session } from "./";
import { responses } from "../../../lib";
import { ErrorHandler } from "../utils";

const lookForErrors = errors => {
  if (!errors.isEmpty())
    throw new ErrorHandler("Invalid Request", ErrorHandler.validation(), {
      error: errors.mapped()
    });
};

/**
 * Checks for the Session Auth Cookie.
 * @param {*} req HTTP/S Request
 * @param {*} res HTTPS/S Response
 * @param {*} next method to jump to next middleware or error middleware
 * @returns {function} next()
 */
const authMiddleware = async (req, res, next) => {
  const errors = validationResult(req);

  try {
    lookForErrors(errors);

    const { session } = matchedData(req, {
      locations: ["cookie"]
    });

    await Session.sessionExists(session);

    res.locals.token = session;
    return next();
  } catch (error) {
    return next(error.boomify());
  }
};

/**
 * GET log in.
 * @param {*} req HTTP/S Request
 * @param {*} res HTTPS/S Response
 * @param {*} next method to jump to next middleware or error middleware
 * @returns {function} next()
 */
const logIn = async (req, res, next) => {
  try {
    const { jwt, refreshToken } = await Session.createSession();

    res.cookie("session", jwt, { httpOnly: true, expires: 0 });

    return responses.successResponse(res, {
      payload: { refreshToken },
      message: "Log In Success!"
    });
  } catch (error) {
    return next(error.boomify());
  }
};

/**
 * GET Log Out the Session
 * @param {*} req HTTP/S Request
 * @param {*} res HTTPS/S Response
 * @param {*} next method to jump to next middleware or error middleware
 * @returns {function} next()
 */
const logOut = async (req, res, next) => {
  try {
    const { token } = res.locals;

    await Session.deleteSession(token);

    res.clearCookie("session");

    return responses.successResponse(res, {
      message: "Successful LogOut!",
      code: 204
    });
  } catch (error) {
    return next(error.boomify());
  }
};

/**
 * POST Refresh a Token
 * @param {*} req HTTP/S Request
 * @param {*} res HTTPS/S Response
 * @param {*} next method to jump to next middleware or error middleware
 * @returns {function} res.json()
 */
const refreshToken = async (req, res, next) => {
  const errors = validationResult(req);

  try {
    lookForErrors(errors);

    const { token } = req.params;

    const session = await Session.refreshSession(token);

    res.clearCookie("session");
    res.cookie("session", session.jwt, { httpOnly: true, expires: 0 });

    return responses.successResponse(res, {
      payload: { refreshToken: session.refreshToken },
      message: "Token refreshed"
    });
  } catch (error) {
    return next(error.boomify());
  }
};

export default {
  authMiddleware,
  logIn,
  logOut,
  refreshToken
};
