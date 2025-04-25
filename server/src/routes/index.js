const express = require('express');

/* Importing the routers. */
const healthRouter = require('./health');
const triggerRouter = require('./triggers');

const router = express.Router();

/* Using the router to route to the health, triggers and docs. */
router.use('/health', healthRouter);
router.use('/triggers', triggerRouter);

module.exports = {
  router,
};
