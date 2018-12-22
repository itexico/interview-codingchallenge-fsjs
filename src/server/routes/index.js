const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');
const itemController = require('../controllers/itemController');
const { catchErrors } = require('../controllers/errorsController');

// Items
router.get('/items', catchErrors(itemController.getItems));
router.get('/items/:id', catchErrors(itemController.getItem));
router.post('/items', catchErrors(itemController.createItem));
router.put('/items/:id', catchErrors(itemController.updateItem));
router.delete('/items/:id', catchErrors(itemController.deleteItem));

// Lists
router.get('/lists', catchErrors(listController.getLists));
router.get('/lists/:id', catchErrors(listController.getList));
router.post('/lists', catchErrors(listController.createList));
router.put('/lists/:id', catchErrors(listController.updateList));
router.delete('/lists/:id', catchErrors(listController.deleteList));

module.exports = router;
