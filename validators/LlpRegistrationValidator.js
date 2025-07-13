const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class LlpRegistrationValidator extends BaseValidator {
  validateCreateLlpRegistration = (data) => {
    const partnerSchema = Joi.object().keys({
      email: Joi.string().email().allow(null, ''),
      cellNumber: Joi.string().allow(null, ''),
      cnicFrontUrl: Joi.string().allow(null, ''),
      cnicBackUrl: Joi.string().allow(null, '')
    });

    const schema = Joi.object().keys({
      preferredName: Joi.string().allow(null, ''),
      secondName: Joi.string().allow(null, ''),
      thirdName: Joi.string().allow(null, ''),
      totalInvestmentPKR: Joi.number().precision(2).allow(null),
      companyAddress: Joi.string().allow(null, ''),
      applicationStatus: Joi.string().allow(null, ''),
      invoiceStatus: Joi.string().allow(null, ''),
      receiptImageUrl: Joi.string().allow(null, ''),
      partners: Joi.array().items(partnerSchema).min(1).required()
    });

    return this.validate(schema, data);
  };

  validateUpdateLlpRegistration = (data) => {
    const partnerSchema = Joi.object().keys({
      email: Joi.string().email().allow(null, ''),
      cellNumber: Joi.string().allow(null, ''),
      cnicFrontUrl: Joi.string().allow(null, ''),
      cnicBackUrl: Joi.string().allow(null, '')
    });

    const schema = Joi.object().keys({
      preferredName: Joi.string().allow(null, ''),
      secondName: Joi.string().allow(null, ''),
      thirdName: Joi.string().allow(null, ''),
      totalInvestmentPKR: Joi.number().precision(2).allow(null),
      companyAddress: Joi.string().allow(null, ''),
      applicationStatus: Joi.string().allow(null, ''),
      invoiceStatus: Joi.string().allow(null, ''),
      receiptImageUrl: Joi.string().allow(null, ''),
      partners: Joi.array().items(partnerSchema).min(1)
    });

    return this.validate(schema, data);
  };
}

module.exports = new LlpRegistrationValidator(); 