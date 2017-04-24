'use strict'

const NODE_ENV = process.env.NODE_ENV
const fs = require('fs')
const path = require('path')
const _ = require('lodash')

// Get defaults
let config = require('./default')

if (NODE_ENV) {
  // Set path of file
  let file = path.resolve('config/env', `${NODE_ENV}.js`)
  // Replace defaults
  try {
    if (fs.statSync(file).isFile()) {
      config = _.defaultsDeep(require(file), config)
    }
  } catch (e) {}
}

module.exports = config
