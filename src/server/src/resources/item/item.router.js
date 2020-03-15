import { Router } from 'express';
import controllers from './item.controllers';

const router = Router();

router
  .route('/')
  .get(controllers.fetchAll)
  .post(controllers.create);

router
  .route('/:id')
  .get(controllers.fetchById)
  .put(controllers.update)
  .delete(controllers.remove);

export default router;
