import Boom from "boom";
import responseHandler from "./responseHandler";

const isProduction = process.env.NODE_ENV === "production";

const createNotFound = (req, res, next) => {
  next(Boom.notFound("You're probably missing"));
};

const checkIfIsBoom = (err, req, res, next) => {
  if (!err.isBoom) {
    return next(Boom.badImplementation(err));
  }

  return next(err);
};

const logError = (err, req, res, next) => {
  if (err.isServer || !isProduction) {
    console.error(err);
    return next(err);
  }

  return next(err);
};

/* eslint-disable-next-line */
const errorHandler = (err, req, res, next) => {
  const { data } = err;
  const { payload, statusCode } = err.output;

  return responseHandler.errorResponse(res, {
    message: payload.message,
    payload: {
      ...payload,
      reason: { ...data }
    },
    statusCode
  });
};

export default {
  checkIfIsBoom,
  logError,
  createNotFound,
  errorHandler
};
