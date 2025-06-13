const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class CommissionIncomeValidator extends BaseValidator {
  validateCommissionIncome = (data) => {
    const schema = Joi.object().keys({
      taxYear: Joi.string().required(),
      lifeInsuranceAgentJson: Joi.object().allow(null),
      generalInsuranceAgentJson: Joi.object().allow(null),
      realEstateTravelAgentJson: Joi.object().allow(null),
      otherCommissionJson: Joi.object().allow(null)
    });

    return this.validate(schema, data);
  };
}

module.exports = new CommissionIncomeValidator(); 