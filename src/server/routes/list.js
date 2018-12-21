'use strict'

var express = require('express');
var ListController = require('../controllers/list');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/list/:id', md_auth.cookieAuth, ListController.getList);
api.get('/lists/', md_auth.cookieAuth, ListController.getLists);
api.post('/list', md_auth.cookieAuth, ListController.saveList);
api.put('/list/:id', md_auth.cookieAuth, ListController.updateList);
api.delete('/list/:id', md_auth.cookieAuth, ListController.deleteList);

module.exports = api;