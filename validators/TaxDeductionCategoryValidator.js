const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class TaxDeductionCategoryValidator extends BaseValidator {
  validateCategorySelection = (data) => {
    const schema = Joi.object().keys({
      taxYear: Joi.string().required(),
      categoryIds: Joi.array().items(Joi.number().integer().positive()).required()
    });

    return this.validate(schema, data);
  };
}

module.exports = new TaxDeductionCategoryValidator(); 