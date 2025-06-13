const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class OtherIncomeValidator extends BaseValidator {
  validateOtherIncome = (data) => {
    const schema = Joi.object().keys({
      taxYear: Joi.string().required(),
      data: Joi.array().items(
        Joi.object().keys({
          incomeType: Joi.string().required(),
          amountPKR: Joi.number().min(0).required(),
          description: Joi.string().allow(null, '')
        })
      ).min(1).required()
    });

    return this.validate(schema, data);
  };
}

module.exports = new OtherIncomeValidator(); 