const logger = require('../config/logger.config');
const HttpException = require('../errors/HttpException.error');

/**
 * It takes a Joi schema, a request parameter (defaults to 'body'), and an error key (defaults to
 * 'BAD_PAYLOAD') and returns a middleware function that validates the request parameter against the
 * schema and throws an error if the validation fails
 * @param schema - Joi schema to validate the request against
 * @param [requestParameter=body] - The request parameter to validate. Defaults to 'body'.
 * @param [errorKey=BAD_PAYLOAD] - This is the key that will be used to identify the error in the error
 * response.
 */
const validate =
  (schema, requestParameter = 'body', errorKey = 'BAD_PAYLOAD') =>
  (req, _res, next) => {
    const { error } = schema.validate(req[requestParameter]);
    if (error) {
      const { details } = error;
      const message = details.map(detail => detail.message).join(',');
      logger.error('Error in validating request:', error);
      next(new HttpException('BAD_REQUEST', errorKey, message));
    } else {
      next();
    }
  };

module.exports = validate;
