const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class ProfitSavingPensionerBenefitValidator extends BaseValidator {
  validatePensionerData = (data) => {
    const schema = Joi.object().keys({
      profitPKR: Joi.number().min(0).required(),
      investmentPKR: Joi.number().min(0).required()
    });

    return this.validate(schema, data);
  };
}

module.exports = new ProfitSavingPensionerBenefitValidator(); 