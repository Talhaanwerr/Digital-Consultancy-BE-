const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class DeductionUtilitiesValidator extends BaseValidator {
  validateUtilitiesItem = (data) => {
    const schema = Joi.object().keys({
      utilityType: Joi.string().required(),
      providerName: Joi.string().required(),
      taxDeductedPKR: Joi.number().min(0).required(),
      consumerRefNo: Joi.string().allow(null, '')
    });

    return this.validate(schema, data);
  };

  validateUtilitiesData = (data) => {
    const schema = Joi.object().keys({
      taxYear: Joi.string().required(),
      data: Joi.array().items(Joi.object().keys({
        utilityType: Joi.string().required(),
        providerName: Joi.string().required(),
        taxDeductedPKR: Joi.number().min(0).required(),
        consumerRefNo: Joi.string().allow(null, '')
      })).required()
    });

    return this.validate(schema, data);
  };
}

module.exports = new DeductionUtilitiesValidator(); 