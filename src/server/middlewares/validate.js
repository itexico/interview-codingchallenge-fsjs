'use strict'

const joi = require('joi')

/**
 * Validate request parameters
 */
module.exports = function (schemas, options) {
  options = options || {
    allowUnknown: true,
    abortEarly: false
  }
  return (req, res, next) => {
    for (let schema in schemas) {
      let requestSchema = req[schema]
      requestSchema = schema === 'params' ? req.params : requestSchema

      let validate = joi.validate(requestSchema, schemas[schema], options)

      if (validate.error) {        
        throw new Error(validate.error)
      }
    }
    next()
  }
}
