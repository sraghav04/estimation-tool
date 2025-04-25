/* This is the main router file. It is importing the health route file and then using it. */
const express = require('express');

const healthRoutes = require('./health.route');

const router = express.Router();

router.use('', healthRoutes);

module.exports = router;
