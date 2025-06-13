const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class DividendCapitalGainIncomeValidator extends BaseValidator {
  validateDividendCapitalGainIncome = (data) => {
    const schema = Joi.object().keys({
      taxYear: Joi.string().required(),
      dividendIncomeJson: Joi.object().allow(null),
      capitalGainJson: Joi.object().allow(null),
      nccplStatementUrl: Joi.string().allow(null, ''),
      mutualFundsReportUrl: Joi.string().allow(null, '')
    });

    return this.validate(schema, data);
  };
}

module.exports = new DividendCapitalGainIncomeValidator(); 