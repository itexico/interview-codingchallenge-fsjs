const express        = require('express');
const ItemController = require('../controllers/ItemController');
const AuthMiddleware = require('../middlewares/authentication');
let api              = express.Router();

api.post('/item/:listId', AuthMiddleware.ensureAuth, ItemController.saveItem);
api.put('/item/:listId/:itemId', AuthMiddleware.ensureAuth, ItemController.updateItem);
api.delete('/item/:listId/:itemId', AuthMiddleware.ensureAuth, ItemController.removeItem);

module.exports = api;