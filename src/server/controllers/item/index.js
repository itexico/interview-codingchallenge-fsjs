import { Router } from "express";

const lists = [
  { id: 1, name: "books" },
  { id: 2, name: "movies" },
  { id: 3, name: "food" },
];

const router = Router();

// Get all lists
router.get("/", (req, res) => {
  res.json({ lists });
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

export const listRouter = router;
