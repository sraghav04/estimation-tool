const { createLogger, transports, format } = require('winston');

/* Creating a logger object that will be used to log messages to the console. */
const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
  transports: [new transports.Console()],
});

module.exports = logger;
