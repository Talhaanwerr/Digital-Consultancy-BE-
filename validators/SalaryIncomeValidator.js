const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class SalaryIncomeValidator extends BaseValidator {
  validateSalaryIncome = (data) => {
    const schema = Joi.object().keys({
      taxYear: Joi.string().required(),
      annualTaxableSalaryPKR: Joi.number().min(0).default(0),
      taxDeductedByEmployerPKR: Joi.number().min(0).default(0),
      taDaPKR: Joi.number().min(0).default(0),
      employerFreeMedicalYN: Joi.boolean().default(false),
      medicalAllowancePKR: Joi.number().min(0).default(0),
      providentFundYN: Joi.boolean().default(false),
      providentFundAmountPKR: Joi.number().min(0).default(0),
      employerVehicleYN: Joi.boolean().default(false),
      employerVehicleCostPKR: Joi.number().min(0).default(0),
      otherAllowancesPKR: Joi.number().min(0).default(0),
      providentGratuityWithdrawalPKR: Joi.number().min(0).default(0),
      taxBorneByEmployerYN: Joi.boolean().default(false)
    });

    return this.validate(schema, data);
  };
}

module.exports = new SalaryIncomeValidator(); 