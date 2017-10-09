'use strict';

class Meta{
  constructor(id , code , status , type , message , detail , errors){
    this.id      = id||undefined;
    this.code    = code||undefined;
    this.status  = status||undefined;
    this.type    = type||undefined;
    this.message = message||undefined;
    this.detail  = detail||undefined;
    this.errors  = errors||undefined;
  }

  
}

module.exports = Meta;