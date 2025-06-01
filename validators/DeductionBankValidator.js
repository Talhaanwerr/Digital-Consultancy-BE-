const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class DeductionBankValidator extends BaseValidator {
  validateBankItem = (data) => {
    const schema = Joi.object().keys({
      transactionType: Joi.string().required(),
      bankName: Joi.string().required(),
      taxDeductedPKR: Joi.number().min(0).required(),
      bankAccountNumber: Joi.string().allow(null, '')
    });

    return this.validate(schema, data);
  };

  validateBankData = (data) => {
    const schema = Joi.object().keys({
      taxYear: Joi.string().required(),
      data: Joi.array().items(Joi.object().keys({
        transactionType: Joi.string().required(),
        bankName: Joi.string().required(),
        taxDeductedPKR: Joi.number().min(0).required(),
        bankAccountNumber: Joi.string().allow(null, '')
      })).required()
    });

    return this.validate(schema, data);
  };
}

module.exports = new DeductionBankValidator(); 