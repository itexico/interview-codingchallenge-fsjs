import { Router } from "express";
import { Item } from "../../models/Item";
import { List } from "../../models/List";

/**
 * Endpoints
 *
 * GET /items/:itemId - Retrieve an item from a list
 * PATCH /items/:itemId - Update an item by id
 * DELETE /items/:itemId - Delete an item by id
 * */

const router = Router();

// GET /items/:itemId - Retrieve an item from a list
router.get("/:itemId", async (req, res, next) => {
  const { itemId } = req.params;

  try {
    const item = await Item.findById(itemId).exec();

    if (!item) return res.status(404).json({ message: "Item not found" });

    res.status(200).json({
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

// PATCH /items/:itemId - Update an item by id
router.patch("/:itemId", async (req, res, next) => {
  const { itemId } = req.params;
  const { title } = req.body;

  if ((!title && title !== "0") || title.length === 0) {
    return res
      .status(400)
      .json({ message: "Title property should be a non-empty string" });
  }

  try {
    const item = await Item.findByIdAndUpdate(
      itemId,
      { title },
      { new: true }
    ).exec();

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({
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

// DELETE /items/:itemId - Delete an item by id
router.delete("/:itemId", async (req, res, next) => {
  const { itemId } = req.params;

  try {
    const item = await Item.findByIdAndDelete(itemId).exec();
    const list = await List.findById(item.list).exec();

    list.items.pull({ _id: itemId });
    list.save();

    res.status(200).json({ itemId });
  } catch (error) {
    next(error);
  }
});

export const itemsRouter = router;
