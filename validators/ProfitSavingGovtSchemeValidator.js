const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class ProfitSavingGovtSchemeValidator extends BaseValidator {
  validateGovtSchemeData = (data) => {
    const schema = Joi.array().items(
      Joi.object().keys({
        schemeType: Joi.string().trim().required(),
        profitPKR: Joi.number().min(0).required(),
        taxDeductedPKR: Joi.number().min(0).required()
      })
    );

    return this.validate(schema, data);
  };
}

module.exports = new ProfitSavingGovtSchemeValidator(); 