const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class SoleProprietorRegistrationValidator extends BaseValidator {
  validateCreateSoleProprietorRegistration = (data) => {
    const schema = Joi.object().keys({
      businessName: Joi.string().required(),
      natureOfBusiness: Joi.string().required(),
      email: Joi.string().email().required(),
      businessAddress: Joi.string().required(),
      cnicFrontUrl: Joi.string().allow(null, ''),
      cnicBackUrl: Joi.string().allow(null, ''),
      rentAgreementUrl: Joi.string().allow(null, ''),
      utilityBillUrl: Joi.string().allow(null, ''),
      applicationStatus: Joi.string(),
      invoiceStatus: Joi.string(),
      receiptImageUrl: Joi.string().allow(null, '')
    });

    return this.validate(schema, data);
  };

  validateUpdateSoleProprietorRegistration = (data) => {
    const schema = Joi.object().keys({
      businessName: Joi.string(),
      natureOfBusiness: Joi.string(),
      email: Joi.string().email(),
      businessAddress: Joi.string(),
      cnicFrontUrl: Joi.string().allow(null, ''),
      cnicBackUrl: Joi.string().allow(null, ''),
      rentAgreementUrl: Joi.string().allow(null, ''),
      utilityBillUrl: Joi.string().allow(null, ''),
      applicationStatus: Joi.string(),
      invoiceStatus: Joi.string(),
      receiptImageUrl: Joi.string().allow(null, '')
    });

    return this.validate(schema, data);
  };
}

module.exports = new SoleProprietorRegistrationValidator(); 