const env = require('dotenv');

env.config();

/**
 * It takes a controller method, a mock payload, and a boolean flag, and returns a function that will either call the
 * controller method or send the mock payload, depending on the boolean flag or the value of the `RESPONSE_TYPE`
 * environment variable
 * @param controllerMethod - The method that will be called if the request is not mocked.
 * @param mockPayload - The mock payload to be returned when the mock mode is enabled.
 * @param [isMocked=false] - This is a boolean value that will override the mock mode.
 */
const resolver =
  (controllerMethod, mockPayload, isMocked = false) =>
  (req, res, next) => {
    const isMockMode =
      isMocked ||
      process.env.RESPONSE_TYPE?.toUpperCase() === 'MOCK' ||
      req.headers['x-request-mock'];
    if (isMockMode) {
      res.send(mockPayload);
      next();
    } else {
      controllerMethod(req, res, next);
    }
  };

module.exports = {
  resolver,
};
