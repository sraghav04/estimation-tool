const Joi = require('joi');

/* This is a schema for the brand and selling division object. */
const brandSellingDivisionSchema = Joi.object().keys({
  brand: Joi.string().required(),
  sellingDivision: Joi.string(),
});
/* This is a schema for the brand and selling division object. */
const brandSellingDivisionSchema2 = Joi.object().keys({
  brand: Joi.string(),
  sellingDivision: Joi.string(),
});
module.exports = {
  brandSellingDivisionSchema,
  brandSellingDivisionSchema2,
};
