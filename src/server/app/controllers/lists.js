"use strict";
var ListModel  = require('../collections/lists').model;
var ListDB     = require('../dataAccess/lists');
var Meta       = require('../entities/meta');

function ListsController(){
  return {
    insertOne, 
    findAll,
    findOne,
    deleteOne,
    updateOne
  }
  

  function insertOne (petition,response,next){
    var list = new ListModel({
        name   : petition.body.name,
        items  : petition.body.items
    });

    ListDB.insertOne(list)
      .then(resultado=> {
        response.locals.results=resultado;
        response.locals.metadata=new Meta("id" , "0000" , 200 , "OK" , "OK" , "OK" , undefined);
        next()
      })
      .catch(error=> {
        response.locals.results=error;
        response.locals.metadata=new Meta("id" , "0000" , 200 , "OK" , "OK" , "OK" , undefined);
        next(error)
      }); 
  };

  function findAll (petition,response,next){
    ListDB.findAll()
      .then(resultado=>{
        response.locals.results={lists:resultado};
        response.locals.metadata=new Meta("id" , "0000" , 200 , "OK" , "OK" , "OK" , undefined);
        next();
      })
    .catch(error=>next());
  };

  function findOne (petition,response,next){
    ListDB.findOne(petition.params.idList)
      .then(resultado=>{
        response.locals.results={lists:resultado};
        response.locals.metadata=new Meta("id" , "0000" , 200 , "OK" , "OK" , "OK" , undefined);
        next();
      })
    .catch(error=>next());
  };

  function deleteOne(petition,response,next){
    ListDB.deleteOne(petition.params.idList)
      .then(resultado=>{
        response.locals.results={lists:resultado};
        response.locals.metadata=new Meta("id" , "0000" , 200 , "OK" , "OK" , "OK" , undefined);
        next();
      })
    .catch(error=>next());
  };

  function updateOne(petition,response,next){
    ListDB.updateOne(petition.params.idList, petition.body)
    .then(result=> {
      response.locals.results=resultado;
      response.locals.metadata=new Meta("id" , "0000" , 200 , "OK" , "OK" , "OK" , undefined);
      next();
    })
    .catch(error=>{ 
      response.locals.results=error;
      response.locals.metadata=new Meta("id" , "0000" , 400 , "OK" , "OK" , "OK" , undefined);
      next();
    });
  };
};

module.exports = ListsController();