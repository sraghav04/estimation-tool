/* Export the middleware functions handling -
  http, error, authorization and joi validation. */
const httpLogger = require('./httpLogger.middleware');
const errorHandler = require('./errorHandler.middleware');
const validate = require('./requestValidator.middleware');
const validateAuthToken = require('./validateAuthToken.middleware');
module.exports = {
  httpLogger,
  errorHandler,
  validateAuthToken,
  validate,
};
