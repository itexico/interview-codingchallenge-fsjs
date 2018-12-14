import Boom from "boom";

const successResponse = (
  res,
  { message = "Succesful Request", code = 200, payload = {} } = {}
) =>
  res.status(code).json({
    success: true,
    message,
    payload
  });

const errorResponse = (res, { payload, statusCode = 500 } = {}) =>
  res.status(statusCode).json({ success: false, payload });

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(err => {
    if (!err.isBoom) {
      return next(Boom.badImplementation(err));
    }

    return next(err);
  });
};

export default {
  successResponse,
  errorResponse,
  asyncMiddleware
};
