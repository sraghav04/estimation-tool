/* Importing the routes from the other files and then defining the paths for the router. */
const express = require('express');

/* Import routes */
const metadataRoutes = require('./metadata.route');

const router = express.Router();

/* Define the router paths */
router.use('/metadata', metadataRoutes);

module.exports = router;
