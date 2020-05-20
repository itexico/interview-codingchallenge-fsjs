import { Types } from "mongoose";

import { List } from "../models/List";
import { Item } from "../models/Item";

export const getAllLists = async (req, res, next) => {
  try {
    const lists = await List.find().exec();

    res.status(200).json({
      lists: lists.map((list) => ({
        listId: list._id,
        title: list.title,
        items: list.items.length,
      })),
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleList = async (req, res, next) => {
  const { listId } = req.params;

  try {
    const list = await List.findById(listId).exec();

    if (!list) return res.status(404).json({ message: "List not found" });
    res.status(200).json({
      list: {
        listId: list._id,
        title: list.title,
        items: list.items.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createSingleList = async (req, res, next) => {
  const { title } = req.body;
  const listId = Types.ObjectId();
  const list = new List({ _id: listId, title, items: [] });

  if ((!title && title !== "0") || title.length === 0) {
    return res
      .status(400)
      .json({ message: "Title property should be a non-empty string" });
  }

  try {
    await list.save();
    res.status(201).json({
      list: {
        listId: list._id,
        title: list.title,
        items: list.items.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateSingleList = async (req, res, next) => {
  const { listId } = req.params;
  const { title } = req.body;

  if ((!title && title !== "0") || title.length === 0) {
    return res
      .status(400)
      .json({ message: "Title property should be a non-empty string" });
  }

  try {
    const list = await List.findByIdAndUpdate(
      listId,
      { title },
      { new: true, useFindAndModify: false }
    ).exec();

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    res.status(200).json({
      list: { listId: list._id, title: list.title, items: list.items.length },
    });
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

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    res.status(200).json({
      list: { listId: list._id, title: list.title, items: list.items.length },
    });
  } catch (error) {
    next(error);
  }
};
