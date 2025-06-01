const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class DeductionOthersValidator extends BaseValidator {
  validateOthersData = (data) => {
    const schema = Joi.object().keys({
      taxYear: Joi.string().required(),
      data: Joi.object().keys({
        eduInstitutionFeeTaxPKR: Joi.number().min(0).default(0),
        airTicketsTaxPKR: Joi.number().min(0).default(0),
        functionsGatheringTaxPKR: Joi.number().min(0).default(0),
        withdrawalVpsFundsTaxPKR: Joi.number().min(0).default(0),
        priorYearsRefundTaxPKR: Joi.number().min(0).default(0)
      }).required()
    });

    return this.validate(schema, data);
  };
}

module.exports = new DeductionOthersValidator(); 