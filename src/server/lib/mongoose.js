'use strict';

const config = require('../config/env').mongo;
const debug = require('./debug');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

/** Set mongo URL */
if (config.replica) {
    config.host = `mongodb://${config.url}:${config.port},${config.replica.url}:${config.replica.port}/${config.db}?replicaSet=${config.replica.set}`;
} else {
    config.host = `mongodb://${config.url}:${config.port}/${config.db}`;
}

/** Set mongo options */
let options = {};
config.user && (options.user = config.user);
config.password && (options.pass = config.password);

/** Connect to mongo service */
mongoose.connect(config.host, options);

/** Events */
mongoose.connection.on('error', debug.database.error);
mongoose.connection.once('open', function () {
  debug.database.info(`Mongo connected to ${config.host}`);
});

module.exports = mongoose;
