import { Router } from "express";
import { middleware as query } from "querymen";

import { Controller } from "./";
import validator from "./validator";

const router = Router();

/* GET all Lists */
router.get("/", validator.checkGetLists, query(), Controller.getLists);

/* GET a List with all Items */
router.get("/:id", validator.checkGetList, Controller.getList);

/* GET a Item of a List */
router.get(
  "/:id/item/:itemId",
  validator.checkGetItem,
  Controller.getItemFromList
);

/* POST Create a new List */
router.post("/new", validator.checkCreateNewList, Controller.createList);

/* POST Add an Item to a List */
router.post("/:id/item/new", validator.checkAddItem, Controller.addItemToList);

/* PATCH Update a List */
router.patch("/:id", validator.checkUpdateList, Controller.updateList);

/* PATCH Update an Item of a List */
router.patch(
  "/:id/item/:itemId",
  validator.checkUpdateItem,
  Controller.updateItem
);

/* DELETE a List */
router.delete("/:id", validator.checkDeleteList, Controller.deleteList);

/* DELETE an Item of a List */
router.delete(
  "/:id/item/:itemId",
  validator.checkDeleteItem,
  Controller.deleteItem
);

/* DELETE Bulk deletes Items from a List */
//router.delete("/:id/item/bulk");

/* DELETE Bulk deletes Lists */
//router.delete("/bulk");

export default router;
