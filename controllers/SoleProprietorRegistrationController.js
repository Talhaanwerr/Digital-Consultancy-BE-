const BaseController = require("./BaseController.js");
const SoleProprietorRegistrationRepo = require("../repos/SoleProprietorRegistrationRepo.js");
const SoleProprietorRegistrationValidator = require("../validators/SoleProprietorRegistrationValidator.js");
const db = require("../models/index.js");
const { ROLES } = require("../constants/constants.js");
const RoleRepo = require("../repos/RoleRepo.js");

class SoleProprietorRegistrationController extends BaseController {
  constructor() {
    super();
  }

  createOrUpdateSoleProprietorRegistration = async (req, res) => {
    try {
      const userId = req.user.id;
      const data = { ...req.body };
      
      // Validate input data
      const result = SoleProprietorRegistrationValidator.validateCreateSoleProprietorRegistration(data);
      if (!result.status) {
        return this.validationErrorResponse(
          res,
          result?.message || "Invalid data"
        );
      }
      
      const { businessName } = result.data;
      
      // Check if a registration already exists for this user and business name
      const existingRegistration = await SoleProprietorRegistrationRepo.findByUserIdAndBusinessName(userId, businessName);
      
      if (existingRegistration) {
        // Update existing registration
        await SoleProprietorRegistrationRepo.updateSoleProprietorRegistration(existingRegistration.id, result.data);
        
        // Fetch the updated registration
        const updatedRegistration = await SoleProprietorRegistrationRepo.findSoleProprietorRegistration({
          where: { id: existingRegistration.id },
          include: [
            {
              model: db.User,
              as: "user",
              attributes: ["id", "firstName", "lastName", "email"]
            }
          ]
        });
        
        return this.successResponse(
          200,
          res,
          updatedRegistration,
          "Sole proprietor registration updated successfully"
        );
      }
      
      // Create new registration
      const registration = await SoleProprietorRegistrationRepo.createSoleProprietorRegistration({
        ...result.data,
        userId
      });
      
      return this.successResponse(
        201,
        res,
        registration,
        "Sole proprietor registration created successfully"
      );
    } catch (error) {
      console.error("Error creating/updating sole proprietor registration:", error);
      return this.serverErrorResponse(
        res,
        "Failed to create/update sole proprietor registration"
      );
    }
  };

  getAllSoleProprietorRegistrations = async (req, res) => {
    try {
      // Extract query parameters
      const {
        page = 1,
        limit = 10,
        search = "",
        sortBy = "createdAt",
        sortOrder = "DESC",
        applicationStatus,
        invoiceStatus
      } = req.query;
      
      // Build the query
      const offset = (parseInt(page) - 1) * parseInt(limit);
      
      // Build where clause
      const whereClause = {
        userId: req.user.id
      };
      
      // Add search functionality
      if (search) {
        whereClause[db.Sequelize.Op.or] = [
          { businessName: { [db.Sequelize.Op.like]: `%${search}%` } },
          { natureOfBusiness: { [db.Sequelize.Op.like]: `%${search}%` } },
          { email: { [db.Sequelize.Op.like]: `%${search}%` } },
          { businessAddress: { [db.Sequelize.Op.like]: `%${search}%` } },
        ];
      }
      
      // Add additional filters
      if (applicationStatus) {
        whereClause.applicationStatus = applicationStatus;
      }
      
      if (invoiceStatus) {
        whereClause.invoiceStatus = invoiceStatus;
      }
      
      // Execute query with pagination
      const { count, rows: registrations } = await SoleProprietorRegistrationRepo.findAndCountSoleProprietorRegistrations({
        where: whereClause,
        order: [[sortBy, sortOrder]],
        limit: parseInt(limit),
        offset,
        include: [
          {
            model: db.User,
            as: "user",
            attributes: ["id", "firstName", "lastName", "email"]
          }
        ]
      });
      
      // Calculate pagination metadata
      const totalPages = Math.ceil(count / parseInt(limit));
      const hasNextPage = parseInt(page) < totalPages;
      const hasPrevPage = parseInt(page) > 1;
      
      return this.successResponse(
        200,
        res,
        {
          registrations,
          pagination: {
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages,
            hasNextPage,
            hasPrevPage
          }
        },
        "Sole proprietor registrations retrieved successfully"
      );
    } catch (error) {
      console.error("Error fetching sole proprietor registrations:", error);
      return this.serverErrorResponse(
        res,
        "Failed to retrieve sole proprietor registrations"
      );
    }
  };

  getSoleProprietorRegistrationById = async (req, res) => {
    try {
      const { id } = req.params;
      
      // Check if user is admin
      let isAdmin = false;
      try {
        const role = await RoleRepo.findRole({
          where: {
            id: req.user.roleId,
          },
          attributes: ['name'],
          raw: true
        });
        
        isAdmin = role && (role.name === ROLES.ADMIN || role.name === ROLES.SUPER_ADMIN);
      } catch (error) {
        console.error("Error fetching role:", error);
        isAdmin = false;
      }
      
      // Build where clause based on user role
      const whereClause = { id };
      
      // If user is not an admin, only allow them to access their own records
      if (!isAdmin) {
        whereClause.userId = req.user.id;
      }
      
      const registration = await SoleProprietorRegistrationRepo.findSoleProprietorRegistration({
        where: whereClause,
        include: [
          {
            model: db.User,
            as: "user",
            attributes: ["id", "firstName", "lastName", "email"]
          }
        ]
      });
      
      if (!registration) {
        return this.errorResponse(
          404,
          res,
          "Sole proprietor registration not found"
        );
      }
      
      return this.successResponse(
        200,
        res,
        registration,
        "Sole proprietor registration retrieved successfully"
      );
    } catch (error) {
      console.error("Error fetching sole proprietor registration:", error);
      return this.serverErrorResponse(
        res,
        "Failed to retrieve sole proprietor registration"
      );
    }
  };

  updateSoleProprietorRegistration = async (req, res) => {
    try {
      const { id } = req.params;
      const data = { ...req.body };
      
      // Validate input data
      const result = SoleProprietorRegistrationValidator.validateUpdateSoleProprietorRegistration(data);
      if (!result.status) {
        return this.validationErrorResponse(
          res,
          result?.message || "Invalid data"
        );
      }
      
      // Check if the registration exists
      const registration = await SoleProprietorRegistrationRepo.findSoleProprietorRegistration({
        where: { id }
      });
      
      if (!registration) {
        return this.errorResponse(
          404,
          res,
          "Sole proprietor registration not found"
        );
      }
      
      // Update the registration
      await SoleProprietorRegistrationRepo.updateSoleProprietorRegistration(id, result.data);
      
      // Fetch the updated registration
      const updatedRegistration = await SoleProprietorRegistrationRepo.findSoleProprietorRegistration({
        where: { id },
        include: [
          {
            model: db.User,
            as: "user",
            attributes: ["id", "firstName", "lastName", "email"]
          }
        ]
      });
      
      return this.successResponse(
        200,
        res,
        updatedRegistration,
        "Sole proprietor registration updated successfully"
      );
    } catch (error) {
      console.error("Error updating sole proprietor registration:", error);
      return this.serverErrorResponse(
        res,
        "Failed to update sole proprietor registration"
      );
    }
  };
}

module.exports = new SoleProprietorRegistrationController(); 