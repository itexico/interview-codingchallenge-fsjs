const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');
const itemController = require('../controllers/itemController');

// Items
router.get('/items', itemController.getItems);
router.get('/items/:id', itemController.getItem);
router.post('/items', itemController.createItem);
router.put('/items/:id', itemController.updateItem);
router.delete('/items/:id', itemController.deleteItem);

// Lists
router.get('/lists', listController.getLists);
router.get('/lists/:id', listController.getList);
router.post('/lists', listController.createList);
router.put('/lists/:id', listController.updateList);
router.delete('/lists/:id', listController.deleteList);

module.exports = router;
