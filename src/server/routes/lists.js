import { Router } from "express";

import {
  getAllLists,
  getSingleList,
  createSingleList,
  updateSingleList,
  deleteSingleList,
  listErrorHandler,
} from "../controllers/lists";

import { getAllItems, createSingleItem } from "../controllers/items";

const router = Router();

router.get("/", getAllLists);
router.get("/:listId", getSingleList);
router.post("/", createSingleList);
router.patch("/:listId", updateSingleList);
router.delete("/:listId", deleteSingleList);

router.get("/:listId/items", getAllItems);
router.post("/:listId/items", createSingleItem);

router.use(listErrorHandler);

export const listRouter = router;
