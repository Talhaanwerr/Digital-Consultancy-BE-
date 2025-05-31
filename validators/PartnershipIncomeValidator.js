const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class PartnershipIncomeValidator extends BaseValidator {
  validatePartnershipIncome = (data) => {
    const schema = Joi.object().keys({
      taxYear: Joi.string().required(),
      partnershipName: Joi.string().required(),
      profitSharePKR: Joi.number().min(0).required(),
      partnerCapitalPKR: Joi.number().min(0).required()
    });

    return this.validate(schema, data);
  };
}

module.exports = new PartnershipIncomeValidator(); 