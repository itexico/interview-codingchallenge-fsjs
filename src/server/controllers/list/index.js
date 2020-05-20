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
router.get("/", async (req, res) => {
  try {
    const lists = await List.find().exec();
    res.status(200).json({ lists });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred fetching the lists",
      error,
    });
  }
});

// GET /lists/:id - Retrieve a list by id
router.get("/:id", async (req, res) => {
  try {
    const list = await List.findById(req.params.id).exec();

    if (!list) {
      return res.status(404).json({
        message: "The list requested was not found",
      });
    }
    res.status(200).json({ list });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred fetching a list",
      error,
    });
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
      message: "Error occurred creating a new list",
      error,
    });
  }
});

export const listRouter = router;
