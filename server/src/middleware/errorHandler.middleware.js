const HttpException = require('../errors/HttpException.error');
const { httpErrors } = require('../constants/error.constant');
const logger = require('../config/logger.config');

/**
 * It takes in an error, and returns a response with the appropriate HTTP status code and error message
 * @param err - The error object that was thrown
 * @param _req - The request object
 * @param res - The response object
 * @param next - The next middleware function in the stack.
 * @param errorDictionary - This is a dictionary of error keys and error config functions.
 * @returns The errorHandler function is being returned.
 */
const errorHandler = (err, _req, res, next, errorDictionary) => {
  const internalServerError = httpErrors.INTERNAL_SERVER_ERROR;
  let httpError, errorConfigFunc;

  /* Checking if the error is an instance of HttpException. If it is, then it is setting the httpError and errorConfigFunc
  variables. */
  if (err instanceof HttpException) {
    httpError = httpErrors[err.errorType];
    errorConfigFunc = errorDictionary[err.moduleErrorKey];
  }

  if (httpError) {
    /* If the error is not an internal server error, then we want to use the error config function to get the description.
    If it is an internal server error, then we want to use the module error key as the description. */
    const description =
      httpError.status !== internalServerError.status && errorConfigFunc
        ? errorConfigFunc(err.message)
        : err.moduleErrorKey;

    res.status(httpError.status).send({
      ...httpError,
      ...(description ? { description } : {}),
    });
    next();
    logger.error(
      `Error Type - ${err.errorType}, Message - ${err.message}, Module Error Key - ${err.moduleErrorKey}`,
    );
    return;
  }

  logger.error('Unhandled Error received as:', err);
  res.status(internalServerError.status).send(internalServerError);
  next();
};

module.exports = errorHandler;
