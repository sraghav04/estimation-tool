const morgan = require('morgan');
const logger = require('../config/logger.config');

/* A custom stream for morgan to write to. */
logger.stream = {
  write: message => logger.info(message.substring(0, message.lastIndexOf('\n'))),
};

module.exports = morgan(':method :url :status :response-time ms - :res[content-length]', {
  stream: logger.stream,
});
