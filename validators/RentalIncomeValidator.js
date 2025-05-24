const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class RentalIncomeValidator extends BaseValidator {
  validateRentalIncome = (data) => {
    const schema = Joi.object().keys({
      taxYear: Joi.string().required(),
      rentReceivedPKR: Joi.number().min(0).default(0),
      taxDeductedByTenantPKR: Joi.number().min(0).default(0),
      propertyExpensesPKR: Joi.number().min(0).default(0)
    });

    return this.validate(schema, data);
  };
}

module.exports = new RentalIncomeValidator(); 