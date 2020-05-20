import { Router } from "express";

import {
  getSingleItem,
  updateSingleItem,
  deleteSingleItem,
} from "../controllers/items";

const router = Router();

router.get("/:itemId", getSingleItem);
router.patch("/:itemId", updateSingleItem);
router.delete("/:itemId", deleteSingleItem);

export const itemsRouter = router;
