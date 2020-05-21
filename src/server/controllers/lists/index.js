import { Types } from "mongoose";

import { List } from "../../models/List";
import {
  mapSuccessListResponse,
  mapErrorListResponse,
  LIST_NOT_FOUND_ERROR,
  INVALID_LIST_TITLE_ERROR,
} from "./mappings";

export const getAllLists = async (req, res, next) => {
  try {
    const lists = await List.find().exec();

    res.status(200).json(mapSuccessListResponse(lists));
  } catch (error) {
    next(error);
  }
};

export const getSingleList = async (req, res, next) => {
  const { listId } = req.params;
  try {
    const list = await List.findById(listId).exec();

    if (!list)
      return res.status(404).json(mapErrorListResponse(LIST_NOT_FOUND_ERROR));

    res.status(200).json(mapSuccessListResponse(list));
  } catch (error) {
    next(error);
  }
};

export const createSingleList = async (req, res, next) => {
  const { title } = req.body;

  if (typeof title !== "string" || title.trim().length === 0)
    return res.status(400).json(mapErrorListResponse(INVALID_LIST_TITLE_ERROR));

  const listId = Types.ObjectId();
  const list = new List({ _id: listId, title, items: [] });

  try {
    await list.save();
    res.status(201).json(mapSuccessListResponse(list));
  } catch (error) {
    next(error);
  }
};

export const updateSingleList = async (req, res, next) => {
  const { listId } = req.params;
  const { title } = req.body;

  if (typeof title !== "string" || title.trim().length === 0)
    return res.status(400).json(mapErrorListResponse(INVALID_LIST_TITLE_ERROR));

  try {
    const list = await List.findByIdAndUpdate(
      listId,
      { title },
      { new: true, useFindAndModify: false }
    ).exec();

    if (!list)
      return res.status(404).json(mapErrorListResponse(LIST_NOT_FOUND_ERROR));

    res.status(200).json(mapSuccessListResponse(list));
  } catch (error) {
    next(error);
  }
};

export const deleteSingleList = async (req, res, next) => {
  const { listId } = req.params;

  try {
    const list = await List.findByIdAndDelete(listId, {
      useFindAndModify: false,
    }).exec();

    if (!list)
      return res.status(404).json(mapErrorListResponse(LIST_NOT_FOUND_ERROR));

    res.status(200).json(mapSuccessListResponse(list));
  } catch (error) {
    next(error);
  }
};

export const listErrorHandler = (error, req, res, next) => {
  res.status(500).json(mapErrorListResponse());
};
