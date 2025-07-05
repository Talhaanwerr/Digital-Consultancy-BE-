const BaseValidator = require("./BaseValidator");
const Joi = require("joi");

class GstPstRegistrationValidator extends BaseValidator {
  constructor() {
    super();
    
    this.gpsTaggedPhotoSchema = Joi.object({
      imageUrl: Joi.string().required()
    });

    this.gstPstCnicSchema = Joi.object({
      cnicImageUrl: Joi.string().required()
    });

    this.createSchema = Joi.object({
      userId: Joi.number().integer().required(),
      businessName: Joi.string().allow('', null),
      legalStatusOFBusiness: Joi.string().allow('', null),
      email: Joi.string().email().allow('', null),
      businessStartDate: Joi.date().allow('', null),
      businessNature: Joi.string().allow('', null),
      electricityConsumerNumber: Joi.string().allow('', null),
      bankMaintenanceCertificatePdfUrl: Joi.string().allow('', null),
      latestUtilityBillImageUrl: Joi.string().allow('', null),
      utilityMeterImageUrl: Joi.string().allow('', null),
      letterHeadImageUrl: Joi.string().allow('', null),
      RentAgreementImageUrl: Joi.string().allow('', null),
      applicationStatus: Joi.string().allow('', null).default('requested'),
      invoiceStatus: Joi.string().allow('', null).default('unpaid'),
      receiptImageUrl: Joi.string().allow('', null),
      gpsTaggedPhotos: Joi.array().items(this.gpsTaggedPhotoSchema).default([]),
      gstPstCnics: Joi.array().items(this.gstPstCnicSchema).default([])
    });

    this.updateSchema = Joi.object({
      businessName: Joi.string().allow('', null),
      legalStatusOFBusiness: Joi.string().allow('', null),
      email: Joi.string().email().allow('', null),
      businessStartDate: Joi.date().allow('', null),
      businessNature: Joi.string().allow('', null),
      electricityConsumerNumber: Joi.string().allow('', null),
      bankMaintenanceCertificatePdfUrl: Joi.string().allow('', null),
      latestUtilityBillImageUrl: Joi.string().allow('', null),
      utilityMeterImageUrl: Joi.string().allow('', null),
      letterHeadImageUrl: Joi.string().allow('', null),
      RentAgreementImageUrl: Joi.string().allow('', null),
      applicationStatus: Joi.string().allow('', null),
      invoiceStatus: Joi.string().allow('', null),
      receiptImageUrl: Joi.string().allow('', null),
      gpsTaggedPhotos: Joi.array().items(this.gpsTaggedPhotoSchema),
      gstPstCnics: Joi.array().items(this.gstPstCnicSchema)
    });
  }

  validateCreate(data) {
    return this.validate(this.createSchema, data);
  }

  validateUpdate(data) {
    return this.validate(this.updateSchema, data);
  }
}

module.exports = new GstPstRegistrationValidator(); 