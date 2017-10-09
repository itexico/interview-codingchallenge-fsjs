"use strict";
var mongoose          = require('mongoose');
var Schema            = mongoose.Schema;

//Enumerados
const statusEnumerate      = ['active', 'inactive'];
const visibilityEnumerate  = ['public', 'private'];

var ItemSchema = new Schema({ 
  name         : {type : String, required : true}
  , status     : {type : String, enum:statusEnumerate, default:statusEnumerate[0]}
  , visibility : {type : String, enum:visibilityEnumerate,  default:visibilityEnumerate[0]}
});

module.exports ={
  model    : mongoose.model('item', ItemSchema)
  , schema : ItemSchema
};