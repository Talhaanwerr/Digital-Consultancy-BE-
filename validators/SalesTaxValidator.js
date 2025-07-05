const BaseValidator = require("./BaseValidator");
const Joi = require("joi");

class SalesTaxValidator extends BaseValidator {
  constructor() {
    super();
    
    this.createSchema = Joi.object({
      userId: Joi.number().integer().required(),
      taxYear: Joi.string().required(),
      taxMonth: Joi.string().required(),
      applicationStatus: Joi.string().valid('active', 'rejected', 'requested').default('requested'),
      invoiceStatus: Joi.string().valid('paid', 'unpaid').default('unpaid'),
      receiptImageUrl: Joi.string().allow('', null),
      ntnCnicNumber: Joi.string().allow('', null),
      ntnCnicPassword: Joi.string().allow('', null),
      saleInvoices: Joi.object({
        invoiceUrls: Joi.array().items(Joi.string()).default([])
      }).allow(null),
      exportInvoices: Joi.object({
        invoiceUrls: Joi.array().items(Joi.string()).default([])
      }).allow(null)
    });

    this.updateSchema = Joi.object({
      applicationStatus: Joi.string().valid('active', 'rejected', 'requested'),
      invoiceStatus: Joi.string().valid('paid', 'unpaid'),
      receiptImageUrl: Joi.string().allow('', null),
      ntnCnicNumber: Joi.string().allow('', null),
      ntnCnicPassword: Joi.string().allow('', null),
      saleInvoices: Joi.object({
        id: Joi.number().integer().allow(null),
        invoiceUrls: Joi.array().items(Joi.string())
      }).allow(null),
      exportInvoices: Joi.object({
        id: Joi.number().integer().allow(null),
        invoiceUrls: Joi.array().items(Joi.string())
      }).allow(null)
    });
  }

  validateCreate(data) {
    return this.validate(this.createSchema, data);
  }

  validateUpdate(data) {
    return this.validate(this.updateSchema, data);
  }
}

module.exports = new SalesTaxValidator(); 