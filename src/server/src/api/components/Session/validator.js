import { param, cookie } from "express-validator/check";

/**
 * Parse an Object to String
 * @param {Object} [object] Object to parse
 * @returns {String} string with the parsed object
 */
const objToString = object => {
  const string = Object.keys(object).reduce((prev, curr) => {
    prev += `${curr}: ${object[curr]} `;
    return prev;
  }, "");

  return `{ ${string}}`;
};

const authChecker = [
  cookie("session")
    .exists()
    .withMessage("Invalid or missing authorization token")
    .isString()
    .withMessage("Invalid Session cookie")
];

const checkRefreshSession = [
  param("token")
    .exists()
    .withMessage("token param required")
    .isString()
    .withMessage("token param must be String")
];

export default {
  authChecker,
  checkRefreshSession
};
