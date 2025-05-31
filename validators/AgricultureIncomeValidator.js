const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class AgricultureIncomeValidator extends BaseValidator {
  validateAgricultureIncome = (data) => {
    const schema = Joi.object().keys({
      taxYear: Joi.string().required(),
      annualAgriIncomePkr: Joi.number().min(0).required()
    });

    return this.validate(schema, data);
  };
}

module.exports = new AgricultureIncomeValidator(); 