const BaseValidator = require('./BaseValidator');
const Joi = require("joi");

class NtnRegistrationValidator extends BaseValidator {
  constructor() {
    super();
    
    // Define validation schemas
    this.createSchema = Joi.object({
      userId: Joi.number().integer().required(),
      telecom: Joi.string().required(),
      cnicFrontUrl: Joi.string().uri().required(),
      cnicBackUrl: Joi.string().uri().required(),
      phone: Joi.string().required(),
      applicationStatus: Joi.string(),
      invoiceStatus: Joi.string().valid('paid', 'unpaid').default('unpaid'),
      receiptImageUrl: Joi.string().uri().allow('', null),
      email: Joi.string().email().required(),
      irisCnicNo: Joi.string().required(),
      irisCnicPassword: Joi.string().required()
    });

    this.updateSchema = Joi.object({
      telecom: Joi.string(),
      cnicFrontUrl: Joi.string().uri(),
      cnicBackUrl: Joi.string().uri(),
      phone: Joi.string(),
      applicationStatus: Joi.string(),
      invoiceStatus: Joi.string().valid('paid', 'unpaid'),
      receiptImageUrl: Joi.string().uri().allow('', null),
      email: Joi.string().email(),
      irisCnicNo: Joi.string(),
      irisCnicPassword: Joi.string()
    });
  }

  validateCreate(data) {
    return this.validate(this.createSchema, data);
  }

  validateUpdate(data) {
    return this.validate(this.updateSchema, data);
  }

  isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }
}

module.exports = new NtnRegistrationValidator(); 