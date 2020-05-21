import { Types } from "mongoose";

import { Item } from "../../models/Item";
import { List } from "../../models/List";
import {
  mapSuccessItemResponse,
  mapErrorItemResponse,
  ITEM_NOT_FOUND_ERROR,
  INVALID_ITEM_TITLE_ERROR,
} from "./mappings";
import { mapErrorListResponse, LIST_NOT_FOUND_ERROR } from "../lists/mappings";

export const getAllItems = async (req, res, next) => {
  const { listId } = req.params;

  try {
    const list = await List.findById(listId).populate("items").exec();

    if (!list) {
      return res.status(404).json(mapErrorItemResponse(LIST_NOT_FOUND_ERROR));
    }

    res.status(200).json(mapSuccessItemResponse(list.items));
  } catch (error) {
    next(error);
  }
};

export const getSingleItem = async (req, res, next) => {
  const { itemId } = req.params;

  try {
    const item = await Item.findById(itemId).exec();

    if (!item) {
      return res.status(404).json(mapErrorItemResponse(ITEM_NOT_FOUND_ERROR));
    }

    res.status(200).json(mapSuccessItemResponse(item));
  } catch (error) {
    next(error);
  }
};

export const createSingleItem = async (req, res, next) => {
  const { title } = req.body;

  if (typeof title !== "string" || title.trim().length === 0)
    return res.status(400).json(mapErrorItemResponse(INVALID_ITEM_TITLE_ERROR));

  const { listId } = req.params;
  const itemId = Types.ObjectId();

  try {
    const list = await List.findById(listId).exec();

    if (!list) {
      return res.status(404).json(mapErrorListResponse(LIST_NOT_FOUND_ERROR));
    }

    const item = new Item({ _id: itemId, title, list: listId });

    await item.save();

    list.items.push(item);
    await list.save();

    res.status(201).json(mapSuccessItemResponse(item));
  } catch (error) {
    next(error);
  }
};

export const updateSingleItem = async (req, res, next) => {
  const { itemId } = req.params;
  const { title } = req.body;

  if (typeof title !== "string" || title.trim().length === 0)
    return res.status(400).json(mapErrorItemResponse(INVALID_ITEM_TITLE_ERROR));

  try {
    const item = await Item.findByIdAndUpdate(
      itemId,
      { title },
      { new: true, useFindAndModify: false }
    ).exec();

    if (!item) {
      return res.status(404).json(mapErrorItemResponse(ITEM_NOT_FOUND_ERROR));
    }

    res.status(200).json(mapSuccessItemResponse(item));
  } catch (error) {
    next(error);
  }
};

export const deleteSingleItem = async (req, res, next) => {
  const { itemId } = req.params;

  try {
    const item = await Item.findByIdAndDelete(itemId, {
      useFindAndModify: false,
    }).exec();

    if (!item) {
      return res.status(404).json(mapErrorItemResponse(ITEM_NOT_FOUND_ERROR));
    }

    const list = await List.findById(item.list).exec();

    list.items.pull({ _id: itemId });
    list.save();

    res.status(200).json(mapSuccessItemResponse(item));
  } catch (error) {
    next(error);
  }
};

export const itemsErrorHandler = (error, req, res, next) => {
  res.status(500).json(mapErrorItemResponse());
};
