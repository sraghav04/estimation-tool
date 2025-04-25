require('dotenv').config();

const app = require('./src/server');
// const app = require('./src/serverNew');
const logger = require('./src/config/logger.config');

const port = process.env.PORT || 8080;

app.listen(port, process.env.HOST, () => {
  logger.info(`Server started at ${process.env.HOST}:${process.env.PORT}`);
});
