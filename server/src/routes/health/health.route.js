/* A router file. It is used to heath requests to the health controller. */
const express = require('express');

const { healthCheck } = require('../../controllers/health/health.controller');

const router = express.Router();

router.get('', healthCheck);

module.exports = router;
