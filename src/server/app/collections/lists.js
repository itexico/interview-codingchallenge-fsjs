"use strict";
var mongoose          = require('mongoose');
var Schema            = mongoose.Schema;
var ItemSchema 		  = require('./items').schema;

//Enumerados
const statusEnumerate      = ['active', 'inactive'];
const visibilityEnumerate  = ['public', 'private'];

var ListSchema = new Schema({
  name         : {type : String, index:true, unique: true, required:true, trim:true}
  , status     : {type : String, enum:statusEnumerate, default:statusEnumerate[0]}
  , visibility : {type : String, enum:visibilityEnumerate,  default:visibilityEnumerate[0]}
  , items      : [ItemSchema]
});

module.exports = {
  model    : mongoose.model('list', ListSchema)
  , schema : ListSchema
};
