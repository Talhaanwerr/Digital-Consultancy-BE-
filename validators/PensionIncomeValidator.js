const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class PensionIncomeValidator extends BaseValidator {
  validatePensionIncome = (data) => {
    const schema = Joi.object().keys({
      taxYear: Joi.string().required(),
      annualPensionPKR: Joi.number().min(0).default(0)
    });

    return this.validate(schema, data);
  };
}

module.exports = new PensionIncomeValidator(); 