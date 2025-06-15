const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class ProfitSavingBankValidator extends BaseValidator {
  validateBankData = (data) => {
    const schema = Joi.array().items(
      Joi.object().keys({
        bankName: Joi.string().trim().required(),
        accountNumber: Joi.string().trim().required(),
        profitPKR: Joi.number().min(0).required(),
        taxDeductedPKR: Joi.number().min(0).required()
      })
    );

    return this.validate(schema, data);
  };
}

module.exports = new ProfitSavingBankValidator(); 