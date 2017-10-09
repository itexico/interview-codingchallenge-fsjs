"use strict";
var ListController = require('../controllers/lists');
var ResponseParser = require('../middleware/responseParser')

module.exports = router =>{
  
  const baseURI = 'lists';

  router.route('/')
    .get([
      ListController.findAll
      , ResponseParser])
    .post([
      ListController.insertOne
      , ResponseParser])

  router.route('/:idList')
    .get([
      ListController.findOne
      , ResponseParser])
    .delete([
      ListController.deleteOne
      , ResponseParser])
    .patch([
      ListController.updateOne
      , ResponseParser]);

  router.route('/:idList/items')
    .get( [x=>console.log("Endpoint")])

  return baseURI;
};