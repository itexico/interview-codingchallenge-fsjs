import express from 'express';
import {
  createList,
  deleteList,
  getListById,
  getLists,
  updateList,
} from '../controllers/listController';
// import { admin, protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(getLists).post(createList);
router.route('/:id').get(getListById).delete(deleteList).put(updateList);

export default router;
