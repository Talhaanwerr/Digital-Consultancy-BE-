const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class IndividualTaxReturnValidator extends BaseValidator {
  validateTaxReturnInfo = (data) => {
    const schema = Joi.object().keys({
      filingFor: Joi.string().required(),
      taxYear: Joi.string().required(),
      applicationStatus: Joi.string().default("draft"),
      invoiceStatus: Joi.string().allow(null, ''),
      receiptImageUrl: Joi.string().allow(null, ''),
      status: Joi.string().optional(),
      
      basicInfo: Joi.object({
        isPakistaniNational: Joi.boolean().required(),
        fullName: Joi.string().required(),
        email: Joi.string().email().required(),
        identifierType: Joi.string().required(),
        identifierNumber: Joi.string().required(),
      }).optional(),
      
      personalInfo: Joi.object({
        occupation: Joi.string().required(),
        isResidentForTaxYear: Joi.boolean().required(),
      }).optional(),
      
      fbrInfo: Joi.object({
        isFbrRegistered: Joi.boolean().required(),
        cnicOrNtnNumber: Joi.string().required(),
        irisPassword: Joi.string().allow(null, ''),
        nicFrontUrl: Joi.string().allow(null, ''),
        nicBackUrl: Joi.string().allow(null, ''),
      }).optional(),
    });

    return this.validate(schema, data);
  };
}

module.exports = new IndividualTaxReturnValidator(); 