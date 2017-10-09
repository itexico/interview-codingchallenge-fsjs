
"use strict";
var Response = require('../entities/response');

let namespace="data";
//const formatObject = (results)=>Object.keys(results).map(atributo=>Array.isArray(results[atributo])?(results[atributo]={[namespace]:results[atributo],lenght:results[atributo].length}):typeof results[atributo] === 'object' &&  results[atributo] !== null ?  formatObject(results[atributo]):null );
const formatObject = (results) => results

function responseParser(req,resp){
  formatObject(resp.locals.results);
  const result = new Response(resp.locals.metadata,resp.locals.results);
  resp.status(result.metadata.status).jsonp(result);
};

module.exports = responseParser;