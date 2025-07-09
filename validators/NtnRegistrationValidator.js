const BaseValidator = require('./BaseValidator');
const Joi = require("joi");

class NtnRegistrationValidator extends BaseValidator {
  constructor() {
    super();
    
    // Define validation schemas
    this.createSchema = Joi.object({
      userId: Joi.number().integer().required(),
      email: Joi.string().email().optional(),
      telecom: Joi.string().optional(),
      phone: Joi.string().optional(),
      cnicFrontUrl: Joi.string().uri().optional(),
      cnicBackUrl: Joi.string().uri().optional(),
      applicationStatus: Joi.string(),
      invoiceStatus: Joi.string().valid('paid', 'unpaid').default('unpaid'),
      receiptImageUrl: Joi.string().uri().allow('', null),
      irisCnicNo: Joi.string().optional(),
      irisCnicPassword: Joi.string().optional()
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