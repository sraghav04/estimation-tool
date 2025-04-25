const Joi = require('joi');
const {
  CYCLE_TYPES,
  TRIGGER_METADATA_MIN_VOLUME,
  TRIGGER_METADATA_MAX_VOLUME,
} = require('../../constants/app.constant');

/* This is a schema for the get metadata object. */
const getMetadataSchema = Joi.object().keys({
  owners: Joi.array().items(Joi.string()),
  searchBy: Joi.string(),
  channels: Joi.array().items(Joi.string()),
  minVolume: Joi.number().min(0).max(TRIGGER_METADATA_MAX_VOLUME),
  maxVolume: Joi.number()
    .min(TRIGGER_METADATA_MIN_VOLUME)
    .max(TRIGGER_METADATA_MAX_VOLUME)
    .when('minVolume', {
      is: Joi.exist(),
      then: Joi.number().min(Joi.ref('minVolume')),
    }),
  isActive: Joi.boolean().valid(true, false),
  /* Validating the page number and page size. */
  page: Joi.number(),
  pageSize: Joi.number(),
  brand: Joi.string().required(),
  //optional
  sellingDivision: Joi.string(),
  /* Validating the value of cycleType. */
  cycleType: Joi.string().valid(...CYCLE_TYPES),
});

/* This is a schema for the patch metadata object. */
const patchMetadataSchema = Joi.array().items({
  tags: Joi.array().items(Joi.string()),
  description: Joi.string(),
  id: Joi.number().required(),
  onCycle: Joi.boolean(),
  deliveryFrequency: Joi.string(),
  owner: Joi.string(),
});

module.exports = {
  getMetadataSchema,
  patchMetadataSchema,
};
