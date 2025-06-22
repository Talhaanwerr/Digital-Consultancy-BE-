const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class PartnershipIncomeValidator extends BaseValidator {
  validatePartnershipIncome = (data) => {
    const partnershipSchema = Joi.object({
      partnershipName: Joi.string().required(),
      profitSharePKR: Joi.number().min(0).required(),
      partnerCapitalPKR: Joi.number().min(0).required()
    });

    const schema = Joi.object().keys({
      taxYear: Joi.string().required(),
      data: Joi.array().items(partnershipSchema).required()
    });

    return this.validate(schema, data);
  };
}

module.exports = new PartnershipIncomeValidator(); 