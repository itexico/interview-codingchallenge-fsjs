import { Router } from "express";

import {
  getSingleItem,
  updateSingleItem,
  deleteSingleItem,
  itemsErrorHandler,
} from "../controllers/items";

const router = Router();

router.get("/:itemId", getSingleItem);
router.patch("/:itemId", updateSingleItem);
router.delete("/:itemId", deleteSingleItem);

router.use(itemsErrorHandler);

export const itemsRouter = router;
