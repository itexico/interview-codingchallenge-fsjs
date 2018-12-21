'use strict'

var express = require('express');
var ItemController = require('../controllers/item');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/item/:id', md_auth.cookieAuth, ItemController.getItem);
api.get('/items/:list?', md_auth.cookieAuth, ItemController.getItems);
api.post('/item/:listId', md_auth.cookieAuth, ItemController.saveItem);
api.put('/item/:id', md_auth.cookieAuth, ItemController.updateItem);
api.delete('/item/:id', md_auth.cookieAuth, ItemController.deleteItem);

module.exports = api;