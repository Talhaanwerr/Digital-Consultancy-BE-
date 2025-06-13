const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class FreelancerIncomeValidator extends BaseValidator {
  validateFreelancerIncome = (data) => {
    const schema = Joi.object().keys({
      taxYear: Joi.string().required(),
      earnsAbroadITYN: Joi.boolean().default(false),
      registeredWithPsebYN: Joi.boolean().default(false),
      freelanceRevenueJson: Joi.object().allow(null),
      expenseSheetJson: Joi.object().allow(null),
      balanceSheetJson: Joi.object().allow(null),
      otherAdjustableTaxJson: Joi.object().allow(null)
    });

    return this.validate(schema, data);
  };
}

module.exports = new FreelancerIncomeValidator(); 