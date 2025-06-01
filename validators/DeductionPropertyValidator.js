const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class DeductionPropertyValidator extends BaseValidator {
  validatePropertyItem = (data) => {
    const schema = Joi.object().keys({
      transactionType: Joi.string().required(),
      propertyAddress: Joi.string().required(),
      areaValue: Joi.number().positive().required(),
      areaUnit: Joi.string().required(),
      taxPaidPKR: Joi.number().min(0).required()
    });

    return this.validate(schema, data);
  };

  validatePropertyData = (data) => {
    const schema = Joi.object().keys({
      taxYear: Joi.string().required(),
      data: Joi.array().items(Joi.object().keys({
        transactionType: Joi.string().required(),
        propertyAddress: Joi.string().required(),
        areaValue: Joi.number().positive().required(),
        areaUnit: Joi.string().required(),
        taxPaidPKR: Joi.number().min(0).required()
      })).required()
    });

    return this.validate(schema, data);
  };
}

module.exports = new DeductionPropertyValidator(); 