const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class BusinessIncomeValidator extends BaseValidator {
  validateBusinessIncome = (data) => {
    const schema = Joi.object().keys({
      taxYear: Joi.string().required(),
      businessTypesJson: Joi.array().items(Joi.string()).allow(null),
      businessRevenueJson: Joi.array().items(Joi.object()).allow(null),
      expenseSheetJson: Joi.object().allow(null),
      balanceSheetJson: Joi.object().allow(null),
      otherAdjustableTaxJson: Joi.object().allow(null),
      notDeductedAmount: Joi.number().precision(2).allow(null)
    });

    return this.validate(schema, data);
  };
}

module.exports = new BusinessIncomeValidator(); 