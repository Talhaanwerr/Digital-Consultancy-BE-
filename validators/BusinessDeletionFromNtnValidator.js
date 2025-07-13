const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class BusinessDeletionFromNtnValidator extends BaseValidator {
  validateCreateBusinessDeletionFromNtn = (data) => {
    const schema = Joi.object().keys({
      cnicOrNtnNumber: Joi.string().required(),
      irisPassword: Joi.string().required(),
      irisPin: Joi.string().allow(null, ''),
      businessName: Joi.string().allow(null, ''),
      businessDeletionDate: Joi.date().allow(null),
      applicationStatus: Joi.string(),
      invoiceStatus: Joi.string(),
      receiptImageUrl: Joi.string().allow(null, '')
    });

    return this.validate(schema, data);
  };

  validateUpdateBusinessDeletionFromNtn = (data) => {
    const schema = Joi.object().keys({
      cnicOrNtnNumber: Joi.string(),
      irisPassword: Joi.string(),
      irisPin: Joi.string().allow(null, ''),
      businessName: Joi.string().allow(null, ''),
      businessDeletionDate: Joi.date().allow(null),
      applicationStatus: Joi.string(),
      invoiceStatus: Joi.string(),
      receiptImageUrl: Joi.string().allow(null, '')
    });

    return this.validate(schema, data);
  };
}

module.exports = new BusinessDeletionFromNtnValidator(); 