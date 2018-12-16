const Router      = require('express').Router();
const ItemRoutes  = require('./ItemRouter');
const ListRoutes  = require('./ListRouter');

Router.use(ItemRoutes);
Router.use(ListRoutes);

module.exports = Router;