import { header, param, body, query } from "express-validator/check";

import { PropertiesToSort as ListProperties } from "./";

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

const checkGetLists = [
  query("q")
    .optional()
    .isString()
    .withMessage("q not valid. Must be string"),
  query("sort")
    .optional()
    .trim()
    .custom(properties => {
      const array = properties.split(",");
      array.forEach(property => {
        if (!ListProperties.includes(property)) {
          throw `sort property not valid. Should be one of this [${ListProperties}]. Given: [${properties}]`;
        }
      });

      return true;
    }),
  query("page")
    .optional()
    .isNumeric()
    .withMessage("page not valid. Must be numeric value"),
  query("limit")
    .optional()
    .isNumeric()
    .withMessage("limit not valid. Must be numeric value")
];

const checkGetList = [
  param("id")
    .exists()
    .withMessage("id required")
];

const checkGetItem = [
  ...checkGetList,
  param("itemId")
    .exists()
    .withMessage("Item id required")
];

const checkCreateNewList = [
  body("name")
    .exists()
    .withMessage("List name required")
    .isString()
    .withMessage("List name Must be String"),
  body("description")
    .exists()
    .withMessage("List description required")
    .isString()
    .withMessage("List description Must be String")
    .custom(description => {
      const length = description.length;

      if (length === 0 || length > 250) {
        throw `Description must be 250 length at max. Given ${length}`;
      }

      return true;
    })
];

const checkAddItem = [
  param("id")
    .exists()
    .withMessage("List id required"),
  ...checkCreateNewList,
  body("rating")
    .exists()
    .withMessage("rating attribute required")
    .isInt({ max: 5, min: 1 })
    .withMessage(
      "rating property should be an integer and greater than 1 and lesser or equal to 5"
    )
];

const checkDeleteList = [
  param("id")
    .exists()
    .withMessage("List id required")
];

const checkDeleteItem = [
  ...checkDeleteList,
  param("itemId")
    .exists()
    .withMessage("Item id required")
];

const checkUpdateList = [
  ...checkDeleteList,
  body("name")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("List name Must be String"),
  body("description")
    .optional({ checkFalsy: true })
    .withMessage("List description required")
    .isString()
    .withMessage("List description Must be String")
    .custom(description => {
      const length = description.length;

      if (length === 0 || length > 250) {
        throw `Description must be 250 length at max. Given ${length}`;
      }

      return true;
    })
];

const checkUpdateItem = [
  ...checkUpdateList,
  param("itemId")
    .exists()
    .withMessage("Item id required"),
  body("rating")
    .optional({ checkFalsy: true })
    .isInt({ min: 1, max: 5 })
    .withMessage(
      "rating property should be an integer and greater than 1 and lesser or equal to 5"
    )
];

export default {
  checkCreateNewList,
  checkAddItem,
  checkGetLists,
  checkGetList,
  checkGetItem,
  checkUpdateList,
  checkUpdateItem,
  checkDeleteList,
  checkDeleteItem
};
