import express from 'express';
import {
  createListItem,
  deleteItemList,
  getListItemById,
  getListItems,
  updateItemList
} from '../controllers/itemController';

const router = express.Router();

router.route('/:id/items').get(getListItems).post(createListItem);
router
  .route('/:id/items/:id')
  .get(getListItemById)
  .delete(deleteItemList)
  .put(updateItemList);

export default router;
