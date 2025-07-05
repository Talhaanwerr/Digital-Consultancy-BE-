const BaseController = require("./BaseController");
const GstPstRegistrationRepo = require("../repos/GstPstRegistrationRepo");
const GstPstRegistrationValidator = require("../validators/GstPstRegistrationValidator");
const { sequelize } = require("../models");

class GstPstRegistrationController extends BaseController {
  constructor() {
    super();
  }

  createGstPstRegistration = async (req, res) => {
    try {
      // Add userId from authenticated user
      const data = { ...req.body, userId: req.user.id };
      
      // Validate request data
      const validationResult = GstPstRegistrationValidator.validateCreate(data);
      if (!validationResult.status) {
        return this.validationErrorResponse(res, validationResult.message);
      }
      
      const { gpsTaggedPhotos, gstPstCnics, ...registrationData } = validationResult.data;
      
      // Use a transaction to ensure data integrity
      const result = await sequelize.transaction(async (t) => {
        return GstPstRegistrationRepo.createWithRelations(
          registrationData,
          gpsTaggedPhotos,
          gstPstCnics
        );
      });
      
      return this.successResponse(
        201,
        res,
        result,
        "GST/PST registration created successfully"
      );
    } catch (error) {
      console.error("Error in createGstPstRegistration:", error);
      return this.serverErrorResponse(res, "Failed to create GST/PST registration");
    }
  }

  getGstPstRegistrations = async (req, res) => {
    try {
      const userId = req.user.id;
      const filters = {
        applicationStatus: req.query.status,
        businessName: req.query.businessName,
        invoiceStatus: req.query.invoiceStatus
      };
      
      // Remove undefined filters
      Object.keys(filters).forEach(key => {
        if (filters[key] === undefined) {
          delete filters[key];
        }
      });
      
      const registrations = await GstPstRegistrationRepo.findByUserId(userId, filters);
      
      return this.successResponse(
        200,
        res,
        registrations,
        "GST/PST registrations retrieved successfully"
      );
    } catch (error) {
      console.error("Error in getGstPstRegistrations:", error);
      return this.serverErrorResponse(res, "Failed to retrieve GST/PST registrations");
    }
  }

  async getAllGstPstRegistrations(req, res) {
    try {
      const filters = {
        applicationStatus: req.query.status,
        businessName: req.query.businessName,
        invoiceStatus: req.query.invoiceStatus
      };
      
      // Remove undefined filters
      Object.keys(filters).forEach(key => {
        if (filters[key] === undefined) {
          delete filters[key];
        }
      });
      
      // Find all registrations with optional filters but no userId filter
      const registrations = await GstPstRegistrationRepo.findAllGSTPST({
        where: filters,
        include: [
          { model: sequelize.models.User, as: 'user', attributes: ['id', 'firstName', 'lastName', 'email'] },
          { model: sequelize.models.GpsTaggedPhoto, as: 'gpsTaggedPhotos' },
          { model: sequelize.models.GstPstCnic, as: 'gstPstCnics' }
        ],
        order: [['createdAt', 'DESC']]
      });
      
      return this.successResponse(
        200,
        res,
        registrations,
        "All GST/PST registrations retrieved successfully"
      );
    } catch (error) {
      console.error("Error in getAllGstPstRegistrations:", error);
      return this.serverErrorResponse(res, "Failed to retrieve all GST/PST registrations");
    }
  }

  getGstPstRegistrationById = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      
      const registration = await GstPstRegistrationRepo.findByIdWithRelations(id, userId);
      
      if (!registration) {
        return this.errorResponse(404, res, "GST/PST registration not found");
      }
      
      return this.successResponse(
        200,
        res,
        registration,
        "GST/PST registration retrieved successfully"
      );
    } catch (error) {
      console.error("Error in getGstPstRegistrationById:", error);
      return this.serverErrorResponse(res, "Failed to retrieve GST/PST registration");
    }
  }

  updateGstPstRegistration = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      
      // Check if the registration exists and belongs to the user
      const existingRegistration = await GstPstRegistrationRepo.findByIdWithRelations(id, userId);
      
      if (!existingRegistration) {
        return this.errorResponse(404, res, "GST/PST registration not found");
      }
      
      // Validate request data
      const validationResult = GstPstRegistrationValidator.validateUpdate(req.body);
      if (!validationResult.status) {
        return this.validationErrorResponse(res, validationResult.message);
      }
      
      const { gpsTaggedPhotos, gstPstCnics, ...registrationData } = validationResult.data;
      
      // Add userId to data for relation creation
      registrationData.userId = userId;
      
      // Use a transaction to ensure data integrity
      const result = await sequelize.transaction(async (t) => {
        return GstPstRegistrationRepo.updateWithRelations(
          id,
          registrationData,
          gpsTaggedPhotos,
          gstPstCnics
        );
      });
      
      return this.successResponse(
        200,
        res,
        result,
        "GST/PST registration updated successfully"
      );
    } catch (error) {
      console.error("Error in updateGstPstRegistration:", error);
      return this.serverErrorResponse(res, "Failed to update GST/PST registration");
    }
  }
}

module.exports = new GstPstRegistrationController(); 