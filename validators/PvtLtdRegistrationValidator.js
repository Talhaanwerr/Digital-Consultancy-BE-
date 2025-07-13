const Joi = require("joi");
const BaseValidator = require("./BaseValidator");

class PvtLtdRegistrationValidator extends BaseValidator {
  validateCreatePvtLtdRegistration = (data) => {
    const directorSchema = Joi.object().keys({
      email: Joi.string().email().required(),
      cellNumber: Joi.string().required(),
      cnicFrontUrl: Joi.string().allow(null, ''),
      cnicBackUrl: Joi.string().allow(null, '')
    });

    const nomineeSchema = Joi.object().keys({
      email: Joi.string().email().required(),
      cellNumber: Joi.string().required(),
      cnicFrontUrl: Joi.string().allow(null, ''),
      cnicBackUrl: Joi.string().allow(null, '')
    });

    const schema = Joi.object().keys({
      isSingleDirector: Joi.boolean().required(),
      preferredName: Joi.string().required(),
      secondName: Joi.string().allow(null, ''),
      thirdName: Joi.string().allow(null, ''),
      authorizedCapitalPKR: Joi.number().precision(2).required(),
      companyAddress: Joi.string().optional(),
      applicationStatus: Joi.string().allow(null, ''),
      invoiceStatus: Joi.string().allow(null, ''),
      receiptImageUrl: Joi.string().allow(null, ''),
      directors: Joi.array().items(directorSchema).min(1).required(),
      nominee: Joi.when('isSingleDirector', {
        is: true,
        then: nomineeSchema.required(),
        otherwise: Joi.optional()
      })
    });

    return this.validate(schema, data);
  };

  validateUpdatePvtLtdRegistration = (data) => {
    const directorSchema = Joi.object().keys({
      email: Joi.string().email().optional(),
      cellNumber: Joi.string().optional(),
      cnicFrontUrl: Joi.string().allow(null, ''),
      cnicBackUrl: Joi.string().allow(null, '')
    });

    const nomineeSchema = Joi.object().keys({
      email: Joi.string().email().optional(),
      cellNumber: Joi.string().optional(),
      cnicFrontUrl: Joi.string().allow(null, ''),
      cnicBackUrl: Joi.string().allow(null, '')
    });

    const schema = Joi.object().keys({
      isSingleDirector: Joi.boolean().optional(),
      preferredName: Joi.string().optional(),
      secondName: Joi.string().allow(null, ''),
      thirdName: Joi.string().allow(null, ''),
      authorizedCapitalPKR: Joi.number().precision(2).optional(),
      companyAddress: Joi.string().optional(),
      applicationStatus: Joi.string().allow(null, ''),
      invoiceStatus: Joi.string().allow(null, ''),
      receiptImageUrl: Joi.string().allow(null, ''),
      directors: Joi.array().items(directorSchema).min(1).optional(),
      nominee: Joi.when('isSingleDirector', {
        is: true,
        then: nomineeSchema.optional(),
        otherwise: Joi.optional()
      })
    });

    return this.validate(schema, data);
  };
}

module.exports = new PvtLtdRegistrationValidator(); 