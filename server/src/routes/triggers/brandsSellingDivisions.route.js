const express = require('express');
const {
  getBrandsSellingDivisions,
} = require('../../controllers/triggers/brandsSellingDivisions.controller');
// const { mockResponse } = require('../../mocks/triggers/brandsSellingDivision.mock');
/* Importing resolver from utils */
const { resolver } = require('../../utils/controllerResolver.util');
const router = express.Router();
const { validateAuthToken } = require('../../middleware');
/* A router that is getting the brand selling divisions from the controller. */
router.get('', validateAuthToken, resolver(getBrandsSellingDivisions));

module.exports = router;
