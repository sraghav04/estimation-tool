const express = require('express');
let router = express.Router();
const { getMetadata, patchMetadata } = require('../../controllers/triggers/metadata.controller');
const validate = require('../../middleware/requestValidator.middleware');
const { mockResponse } = require('../../mocks/triggers/metadata.mock');
const {
  getMetadataSchema,
  patchMetadataSchema,
} = require('../../schemas/triggers/metadata.schema');
const { resolver } = require('../../utils/controllerResolver.util');
const { validateAuthToken } = require('../../middleware');
/* A router that is getting the metadata from the controller. */
router.get(
  '',
  validateAuthToken,
  /* A middleware that is validating the request payload and then calling the controller function. */
  validate(getMetadataSchema, 'query', 'TRIGGERS_METADATA_BAD_PAYLOAD'),
  resolver(getMetadata, mockResponse),
);

/* A router that is updating the metadata from the controller. */
router.patch(
  '',
  validateAuthToken,
  /* A middleware that is validating the request payload and then calling the controller function. */
  validate(patchMetadataSchema, 'body', 'TRIGGERS_METADATA_BAD_PAYLOAD'),
  resolver(patchMetadata),
);

module.exports = router;
