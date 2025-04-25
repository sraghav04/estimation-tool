const express = require('express');

const { getFilters } = require('../../controllers/triggers/filters.controller');
const validate = require('../../middleware/requestValidator.middleware');
// const { mockResponse } = require('../../mocks/triggers/filters.mock');
const { brandSellingDivisionSchema } = require('../../schemas/triggers/common.schema');
const { resolver } = require('../../utils/controllerResolver.util');
const router = express.Router();
const { validateAuthToken } = require('../../middleware');
/* A router that is getting the filters from the controller. */
router.get(
  '',
  validateAuthToken,
  /* A middleware that is validating the request payload and then calling the controller function. */
  validate(brandSellingDivisionSchema, 'query', 'TRIGGERS_FILTERS_BAD_PAYLOAD'),
  resolver(getFilters),
);

module.exports = router;
