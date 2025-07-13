const Joi = require("joi");
const BaseValidator = require("./BaseValidator");

class AopRegistrationValidator extends BaseValidator {
  validateCreateAopRegistration = (data) => {
    const partnerSchema = Joi.object().keys({
      email: Joi.string().email().required(),
      cellNumber: Joi.string().required(),
      cnicFrontUrl: Joi.string().allow(null, ''),
      cnicBackUrl: Joi.string().allow(null, '')
    });

    const schema = Joi.object().keys({
      preferredName: Joi.string().required(),
      secondName: Joi.string().allow(null, ''),
      thirdName: Joi.string().allow(null, ''),
      totalInvestmentPKR: Joi.number().precision(2).required(),
      companyAddress: Joi.string().required(),
      applicationStatus: Joi.string().allow(null, ''),
      invoiceStatus: Joi.string().allow(null, ''),
      receiptImageUrl: Joi.string().allow(null, ''),
      partners: Joi.array().items(partnerSchema).min(1).required()
    });

    return this.validate(schema, data);
  };

  validateUpdateAopRegistration = (data) => {
    const partnerSchema = Joi.object().keys({
      email: Joi.string().email().optional(),
      cellNumber: Joi.string().optional(),
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

module.exports = new AopRegistrationValidator(); 