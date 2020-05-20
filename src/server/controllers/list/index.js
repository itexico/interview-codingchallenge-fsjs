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
router.get("/", (req, res) => {
  res.json({ lists });
});

// GET /lists/:id - Retrieve a list by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const list = lists.find((list) => list.id === Number(id));

  if (list) {
    res.json({ list });
  } else {
    res.status(404).json({ message: "The list requested is not found" });
  }
});

// POST /lists - Create a new list
router.post("/", async (req, res) => {
  const listId = Types.ObjectId();

  const list = new List({
    _id: listId,
    title: req.body.title,
    items: [],
  });

  try {
    await list.save();
    res.status(201).json({
      message: `You've successfully created a new list`,
      list,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

export const listRouter = router;
