const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class TaxBenefitCreditValidator extends BaseValidator {
  validateTaxBenefitCredit = (data) => {
    const schema = Joi.object().keys({
      taxYear: Joi.string().required(),
      qualifiesForRebatesYN: Joi.boolean().default(false),
      donationZakatPKR: Joi.number().min(0).default(0),
      pensionFundInvestmentPKR: Joi.number().min(0).default(0),
      houseLoanInterestRentPKR: Joi.number().min(0).default(0),
      tuitionFeePKR: Joi.number().min(0).default(0),
      numberOfChildren: Joi.number().integer().min(0).default(0),
      isFullTimeTeacherResearcherYN: Joi.boolean().default(false)
    });

    return this.validate(schema, data);
  };
}

module.exports = new TaxBenefitCreditValidator(); 