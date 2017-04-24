'use strict';

const debug = require('debug');

/** Services to debug */
let services = [
  'com',
  'database',
  'http',
  'dashboard'
];

/** Set default debuggers */
let debuggers = debug('nodeServer');
debuggers.error = debug('nodeServer:error');
debuggers.info = debug('nodeServer:info');

/** Set debuggers of services */
for (let service of services) {
  debuggers[service] = debug(service);
  debuggers[service].error = debug(`${service}:error`);
  debuggers[service].info = debug(`${service}:info`);
}

module.exports = debuggers;
