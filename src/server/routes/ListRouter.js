const express        = require('express');
const ListController = require('../controllers/ListController');
const AuthMiddleware = require('../middlewares/authentication');
let api              = express.Router();

api.get('/list/:id', AuthMiddleware.ensureAuth, ListController.getList);
api.post('/list', AuthMiddleware.ensureAuth, ListController.saveList);
api.put('/list/:id', AuthMiddleware.ensureAuth, ListController.updateList);
api.delete('/list/:id', AuthMiddleware.ensureAuth, ListController.removeList);
api.get('/lists', AuthMiddleware.ensureAuth, ListController.getLists);

module.exports = api;