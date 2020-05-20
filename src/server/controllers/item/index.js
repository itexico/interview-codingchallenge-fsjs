import { Router } from "express";
import { Item } from "../../models/Item";

/**
 * Endpoints
 *
 * GET /items/:itemId - Retrieve an item from a list
 * PATCH /items/:itemId - Update a list by id
 * DELETE /items/:itemId - Delete a list by id
 * */

const router = Router();

// GET /items/:itemId - Retrieve an item from a list
router.get("/:itemId", async (req, res, next) => {
  const { itemId } = req.params;

  try {
    const item = await Item.findById(itemId).exec();

    if (!item) return res.status(404).json({ item: null });

    res.status(200).json({ item });
  } catch (error) {
    next(error);
  }
});

// Get list by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const list = lists.find((list) => list.id === Number(id));

  if (list) {
    res.json({ list });
  } else {
    res.status(404).json({ message: "The list requested is not found" });
  }
});

export const itemsRouter = router;
