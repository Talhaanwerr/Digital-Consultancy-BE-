const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class BusinessAdditionToNtnValidator extends BaseValidator {
  validateCreateBusinessAdditionToNtn = (data) => {
    const schema = Joi.object().keys({
      cnicOrNtnNumber: Joi.string().required(),
      irisPassword: Joi.string().required(),
      irisPin: Joi.string().allow(null, ''),
      businessName: Joi.string().allow(null, ''),
      natureOfBusiness: Joi.string().allow(null, ''),
      businessAddress: Joi.string().allow(null, ''),
      businessStartDate: Joi.date().allow(null),
      applicationStatus: Joi.string(),
      invoiceStatus: Joi.string(),
      receiptImageUrl: Joi.string().allow(null, '')
    });

    return this.validate(schema, data);
  };

  validateUpdateBusinessAdditionToNtn = (data) => {
    const schema = Joi.object().keys({
      cnicOrNtnNumber: Joi.string().allow(null, ''),
      irisPassword: Joi.string().allow(null, ''),
      irisPin: Joi.string().allow(null, ''),
      businessName: Joi.string().allow(null, ''),
      natureOfBusiness: Joi.string().allow(null, ''),
      businessAddress: Joi.string().allow(null, ''),
      businessStartDate: Joi.date().allow(null),
      applicationStatus: Joi.string(),
      invoiceStatus: Joi.string(),
      receiptImageUrl: Joi.string().allow(null, '')
    });

    return this.validate(schema, data);
  };
}

module.exports = new BusinessAdditionToNtnValidator(); 