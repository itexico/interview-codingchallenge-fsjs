import { validationResult } from "express-validator/check";
import { matchedData } from "express-validator/filter";

import { List } from "./";
import { responses } from "../../../lib";
import { ErrorHandler } from "../utils";

/**
 * Get the current page of the paginator
 * @param {Number} [skip] How many documents are MongoDB skipping
 * @param {Number} [limit] How many documents shows per page
 * @returns {Object} Pagination data
 */
const getPagination = (skip, limit) => ({
  page: skip / limit + 1,
  perPage: limit
});

const lookForErrors = errors => {
  if (!errors.isEmpty())
    throw new ErrorHandler("Invalid Request", ErrorHandler.validation(), {
      error: errors.mapped()
    });
};

/**
 * GET all Lists.
 * @param {*} req HTTP/S Request
 * @param {*} res HTTPS/S Response
 * @param {*} next method to jump to next middleware or error middleware
 * @returns {function} next()
 */
const getLists = async (req, res, next) => {
  const errors = validationResult(req);

  try {
    lookForErrors(errors);

    const { query, cursor } = req.querymen;

    const lists = await List.getLists({
      query,
      cursor
    });

    return responses.successResponse(res, {
      payload: { ...getPagination(cursor.skip, cursor.limit), lists },
      message: "Successful Request"
    });
  } catch (error) {
    return next(error.boomify());
  }
};

/**
 * GET one List.
 * @param {*} req HTTP/S Request
 * @param {*} res HTTPS/S Response
 * @param {*} next method to jump to next middleware or error middleware
 * @returns {function} next()
 */
const getList = async (req, res, next) => {
  const errors = validationResult(req);

  try {
    lookForErrors(errors);

    const { id } = req.params;

    const list = await List.findListByID(id, { full: true });

    return responses.successResponse(res, {
      payload: { list },
      message: "List Found"
    });
  } catch (error) {
    return next(error.boomify());
  }
};

/**
 * GET an Item from List
 * @param {*} req HTTP/S Request
 * @param {*} res HTTPS/S Response
 * @param {*} next method to jump to next middleware or error middleware
 * @returns {function} next()
 */
const getItemFromList = async (req, res, next) => {
  const errors = validationResult(req);

  try {
    lookForErrors(errors);

    const { id, itemId } = req.params;

    const item = await List.getItemById(id, itemId, { full: true });

    return responses.successResponse(res, {
      payload: { item },
      message: "Item Found"
    });
  } catch (error) {
    return next(error.boomify());
  }
};

/**
 * POST Create a new List
 * @param {*} req HTTP/S Request
 * @param {*} res HTTPS/S Response
 * @param {*} next method to jump to next middleware or error middleware
 * @returns {function} res.json()
 */
const createList = async (req, res, next) => {
  const errors = validationResult(req);

  try {
    lookForErrors(errors);

    const listData = matchedData(req, {
      includeOptionals: true,
      locations: ["body"]
    });

    const newList = await List.createList(listData);

    return responses.successResponse(res, {
      payload: { list: newList },
      message: "List created succesfuly!"
    });
  } catch (error) {
    return next(error.boomify());
  }
};

/**
 * POST adds an Item to a List
 * @param {*} req HTTP/S Request
 * @param {*} res HTTPS/S Response
 * @param {*} next method to jump to next middleware or error middleware
 * @returns {function} next()
 */
const addItemToList = async (req, res, next) => {
  const errors = validationResult(req);

  try {
    lookForErrors(errors);

    const { id } = req.params;

    const itemData = matchedData(req, {
      includeOptionals: true,
      locations: ["body"]
    });

    const newItem = await List.addItemToList(id, itemData);

    return responses.successResponse(res, {
      payload: { item: newItem },
      message: "Item succesfully added to a List!"
    });
  } catch (error) {
    return next(error.boomify());
  }
};

/**
 * PATCH update a List
 * @param {*} req HTTP/S Request
 * @param {*} res HTTPS/S Response
 * @param {*} next method to jump to next middleware or error middleware
 * @returns {function} next()
 */
const updateList = async (req, res, next) => {
  const errors = validationResult(req);

  try {
    lookForErrors(errors);

    const { id } = req.params;

    const listData = matchedData(req, {
      includeOptionals: true,
      locations: ["body"]
    });

    const list = await List.updateList(id, listData);

    return responses.successResponse(res, {
      payload: { list },
      message: "List succesfully updated!"
    });
  } catch (error) {
    return next(error.boomify());
  }
};

/**
 * PATCH update an Item from a List
 * @param {*} req HTTP/S Request
 * @param {*} res HTTPS/S Response
 * @param {*} next method to jump to next middleware or error middleware
 * @returns {function} next()
 */
const updateItem = async (req, res, next) => {
  const errors = validationResult(req);

  try {
    lookForErrors(errors);

    const { id, itemId } = req.params;

    const itemData = matchedData(req, {
      includeOptionals: true,
      locations: ["body"]
    });

    const item = await List.updateItem(id, itemId, itemData, { full: false });

    return responses.successResponse(res, {
      payload: { item },
      message: "Item succesfully updated!"
    });
  } catch (error) {
    return next(error.boomify());
  }
};

/**
 * DELETE a List
 * @param {*} req HTTP/S Request
 * @param {*} res HTTPS/S Response
 * @param {*} next method to jump to next middleware or error middleware
 * @returns {function} next()
 */
const deleteList = async (req, res, next) => {
  const errors = validationResult(req);

  try {
    lookForErrors(errors);

    const { id } = req.params;

    await List.deleteList(id);

    return responses.successResponse(res, {
      code: 204,
      message: "List Successfully Deleted!"
    });
  } catch (error) {
    return next(error.boomify());
  }
};

/**
 * DELETE an Item from a List
 * @param {*} req HTTPS/S Request
 * @param {*} res HTTPS/S Response
 * @param {*} next method to jump to next middleware or error middleware
 * @returns {function} next()
 */
const deleteItem = async (req, res, next) => {
  const errors = validationResult(req);

  try {
    lookForErrors(errors);

    const { id, itemId } = req.params;

    await List.deleteItem(id, itemId);

    return responses.successResponse(res, {
      code: 204,
      message: "Item successfully deleted from the List"
    });
  } catch (error) {
    return next(error.boomify());
  }
};

export default {
  getLists,
  getList,
  deleteItem,
  createList,
  addItemToList,
  getItemFromList,
  updateList,
  updateItem,
  deleteList
};
