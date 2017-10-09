var mongoose  = require('mongoose');
var ListModel = require('../collections/lists').model;

function ListDB(){};

/**
 * @param  {Promise} )> [description]
 * @return {[Promise]}     [description]
 */

ListDB.prototype.insertOne=(list)=>new Promise((resolve, reject) => {
  list.save()
    .then(resultado=>{resolve(resultado)})
    .catch(error=>{
      reject(error)
    });
});

ListDB.prototype.findOne=(idList)=>new Promise((resolve, reject) => {
    ListModel.findOne({_id:idList}).exec().then(resultado=>{
      resolve(resultado)
    }).catch(error=>{
      reject(error)
    });
});

ListDB.prototype.findAll=()=>new Promise((resolve, reject) => {
    ListModel.find().exec().then(resultado=>{
      resolve(resultado)
    }).catch(error=>{
      reject(error)
    });
});

ListDB.prototype.deleteOne=(idList)=> new Promise((resolve,reject) =>{
    ListModel.remove({_id:idList}).then(resultado=>{
      resolve(resultado)
    }).catch(error=>{
      reject(error)
    });
});

ListDB.prototype.updateOne=(idList,list) => new Promise((resolve,reject) =>{
  ListModel.findOneAndUpdate({_id:idList} ,{name:list.name}, {items:list.items})
  .then(resultado=>{
    resolve(resultado)
  })
  .catch(error=>{
    reject(error);
  });
})

module.exports = new ListDB();
