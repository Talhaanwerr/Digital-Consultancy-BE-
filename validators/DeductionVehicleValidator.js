const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class DeductionVehicleValidator extends BaseValidator {
  validateVehicleItem = (data) => {
    const schema = Joi.object().keys({
      vehicleTaxType: Joi.string().required(),
      vehicleType: Joi.string().required(),
      taxDeductedPKR: Joi.number().min(0).required(),
      vehicleRegNumber: Joi.string().allow(null, '')
    });

    return this.validate(schema, data);
  };

  validateVehicleData = (data) => {
    const schema = Joi.object().keys({
      taxYear: Joi.string().required(),
      data: Joi.array().items(Joi.object().keys({
        vehicleTaxType: Joi.string().required(),
        vehicleType: Joi.string().required(),
        taxDeductedPKR: Joi.number().min(0).required(),
        vehicleRegNumber: Joi.string().allow(null, '')
      })).required()
    });

    return this.validate(schema, data);
  };
}

module.exports = new DeductionVehicleValidator(); 