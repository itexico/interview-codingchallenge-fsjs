import { Router } from "express";
import { Types } from "mongoose";

import { List } from "../../models/List";
import { Item } from "../../models/Item";

const router = Router();

/**
 * Endpoints
 *
 * GET /lists - Retrieve all lists
 * GET /lists/:listId - Retrieve a list by id
 * POST /lists - Create a new list
 * PATCH /lists/:listId - Update a list by id
 * DELETE /lists/:listId - Delete a list by id
 *
 * GET /lists/:listId/items - Retrieve all list items
 * POST /lists/:listId/items - Add a new item to a list
 * */

// GET /lists - Retrieve all lists
router.get("/", async (req, res, next) => {
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
});

// GET /lists/:listId - Retrieve a list by id
router.get("/:listId", async (req, res, next) => {
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
});

// POST /lists - Create a new list
router.post("/", async (req, res, next) => {
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
});

// PATCH /lists/:listId - Update a list by id
router.patch("/:listId", async (req, res, next) => {
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
});

// DELETE /lists/:listId - Delete a list by id
router.delete("/:listId", async (req, res, next) => {
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
});

// GET /lists/:listId/items - Retrieve all list items
router.get("/:listId/items", async (req, res, next) => {
  const { listId } = req.params;

  try {
    const list = await List.findById(listId).populate("items").exec();

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    res.status(200).json({
      items: list.items.map((item) => ({
        itemId: item._id,
        listId: item.list,
        title: item.title,
      })),
    });
  } catch (error) {
    next(error);
  }
});

// POST /lists/:listId/items - Add a new item to a list
router.post("/:listId/items", async (req, res, next) => {
  const { listId } = req.params;
  const { title } = req.body;
  const itemId = Types.ObjectId();

  if ((!title && title !== "0") || title.length === 0) {
    return res
      .status(400)
      .json({ message: "Title property should be a non-empty string" });
  }

  try {
    const list = await List.findById(listId).exec();

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    const item = new Item({ _id: itemId, title, list: listId });

    await item.save();

    list.items.push(item);
    await list.save();

    res.status(201).json({
      item: {
        itemId: item._id,
        listId: item.list,
        title: item.title,
      },
    });
  } catch (error) {
    next(error);
  }
});

export const listRouter = router;
