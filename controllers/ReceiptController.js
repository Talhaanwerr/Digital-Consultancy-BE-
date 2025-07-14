const BaseController = require('./BaseController');
const db = require('../models');
const Joi = require('joi');
const { ENTITY_TYPES } = require('../constants/constants');

class ReceiptController extends BaseController {
  constructor() {
    super();
  }

  uploadReceipt = async (req, res) => {
    try {
      // Validate request body
      const schema = Joi.object({
        type: Joi.string().valid(
          ENTITY_TYPES.INDIVIDUAL_TAX_RETURN,
          ENTITY_TYPES.SALES_TAX,
          ENTITY_TYPES.NTN,
          ENTITY_TYPES.GST_PST,
          ENTITY_TYPES.BUSINESS_SOLE,
          ENTITY_TYPES.BUSINESS_ADD_NTN,
          ENTITY_TYPES.BUSINESS_DEL_NTN,
          ENTITY_TYPES.LLP,
          ENTITY_TYPES.AOP,
          ENTITY_TYPES.PVT_LTD,
          ENTITY_TYPES.COMPANY_RETURN_FILING
        ).required(),
        id: Joi.number().integer().required(),
        receiptImageUrl: Joi.string().required()
      });

      const { error, value } = schema.validate(req.body);
      if (error) {
        return this.validationErrorResponse(
          res,
          error.details[0].message
        );
      }

      const { type, id, receiptImageUrl } = value;
      const userId = req.user.id;

      // Get the appropriate repository based on type
      let repository;
      let whereClause = { id, userId };

      // For most entities, we need to check userId for authorization
      switch (type) {
        case ENTITY_TYPES.INDIVIDUAL_TAX_RETURN:
          repository = db.IndividualTaxReturn;
          break;
        case ENTITY_TYPES.SALES_TAX:
          repository = db.SalesTax;
          break;
        case ENTITY_TYPES.NTN:
          repository = db.NtnRegistration;
          break;
        case ENTITY_TYPES.GST_PST:
          repository = db.GstPstRegistration;
          break;
        case ENTITY_TYPES.BUSINESS_SOLE:
          repository = db.SoleProprietorRegistration;
          break;
        case ENTITY_TYPES.BUSINESS_ADD_NTN:
          repository = db.BusinessAdditionToNtn;
          break;
        case ENTITY_TYPES.BUSINESS_DEL_NTN:
          repository = db.BusinessDeletionFromNtn;
          break;
        case ENTITY_TYPES.LLP:
          repository = db.LlpRegistration;
          break;
        case ENTITY_TYPES.AOP:
          repository = db.AopRegistration;
          break;
        case ENTITY_TYPES.PVT_LTD:
          repository = db.PvtLtdRegistration;
          break;
        case ENTITY_TYPES.COMPANY_RETURN_FILING:
          repository = db.CompanyReturnFiling;
          break;
        default:
          return this.errorResponse(
            400,
            res,
            `Unsupported entity type: ${type}`
          );
      }

      // Find the record
      const record = await repository.findOne({
        where: whereClause
      });

      if (!record) {
        return this.errorResponse(
          404,
          res,
          `${type} record not found with ID ${id}`
        );
      }

      // Update the receiptImageUrl
      await record.update({ receiptImageUrl });

      return this.successResponse(
        200,
        res,
        { success: true },
        'Receipt uploaded successfully'
      );
    } catch (error) {
      console.error('Error uploading receipt:', error);
      return this.serverErrorResponse(
        res,
        'Failed to upload receipt'
      );
    }
  };
}

module.exports = new ReceiptController(); 