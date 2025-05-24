const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class CompanyReturnFilingValidator extends BaseValidator {
  validateCreateCompanyReturn = (data) => {
    const schema = Joi.object().keys({
      taxYear: Joi.string().required(),
      businessNature: Joi.string().allow(null, ''),
      businessType: Joi.string().required(),
      applicationStatus: Joi.string().default("requested"),
      invoiceStatus: Joi.string().allow(null, ''),
      receiptImageUrl: Joi.string().allow(null, ''),
      bankStatementPdfUrl: Joi.string().allow(null, ''),
      financialStatementPdfUrl: Joi.string().allow(null, '')
    });

    return this.validate(schema, data);
  };

  validateUpdateCompanyReturn = (data) => {
    const schema = Joi.object().keys({
      taxYear: Joi.string().required(),
      businessNature: Joi.string().allow(null, ''),
      businessType: Joi.string().required(),
      applicationStatus: Joi.string(),
      invoiceStatus: Joi.string().allow(null, ''),
      receiptImageUrl: Joi.string().allow(null, ''),
      bankStatementPdfUrl: Joi.string().allow(null, ''),
      financialStatementPdfUrl: Joi.string().allow(null, '')
    });

    return this.validate(schema, data);
  };
}

module.exports = new CompanyReturnFilingValidator(); 