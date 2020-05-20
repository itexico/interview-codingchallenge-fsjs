import { Router } from "express";
import { List } from "../../models/List";
import { Types } from "mongoose";

const router = Router();

/**
 * Endpoints
 *
 * GET /lists - Retrieve all lists
 * GET /lists/:id - Retrieve a list by id
 * POST /lists - Create a new list
 * PUT /lists/:id - Update a list by id
 * DELETE /lists/:id - Delete a list by id
 * */

// GET /lists - Retrieve all lists
router.get("/", async (req, res, next) => {
  try {
    const lists = await List.find().exec();

    res.status(200).json({ lists });
  } catch (error) {
    next(error);
  }
});

// GET /lists/:id - Retrieve a list by id
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const list = await List.findById(id).exec();

    if (!list) return res.status(404).json({ list: null });
    res.status(200).json({ list });
  } catch (error) {
    next(error);
  }
});

// POST /lists - Create a new list
router.post("/", async (req, res, next) => {
  const { title } = req.body;
  const id = Types.ObjectId();
  const list = new List({ _id: id, title, items: [] });

  try {
    await list.save();
    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
});

// PUT /lists/:id - Update a list by id
router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const patchObject = { ...req.body };

  try {
    await List.updateOne({ _id: id }, patchObject).exec();
    res.status(200).json({ id });
  } catch (error) {
    next(error);
  }
});

// DELETE /lists/:id - Delete a list by id
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    await List.deleteOne({ _id: id }).exec();
    res.status(200).json({ id });
  } catch (error) {
    next(error);
  }
});

export const listRouter = router;
