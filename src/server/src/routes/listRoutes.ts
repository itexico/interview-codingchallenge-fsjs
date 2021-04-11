import express from 'express';
import {
  getLists,
  getListById,
  deleteList,
  updateList,
  createList,
} from '../controllers/listController';
// import { admin, protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(getLists).post(createList);
router.route('/:id').get(getListById).delete(deleteList).put(updateList);

export default router;
