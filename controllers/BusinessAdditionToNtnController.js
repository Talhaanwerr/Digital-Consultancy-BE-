const BaseController = require("./BaseController.js");
const BusinessAdditionToNtnRepo = require("../repos/BusinessAdditionToNtnRepo.js");
const BusinessAdditionToNtnValidator = require("../validators/BusinessAdditionToNtnValidator.js");
const db = require("../models/index.js");
const { ROLES } = require("../constants/constants.js");
const RoleRepo = require("../repos/RoleRepo.js");

class BusinessAdditionToNtnController extends BaseController {
  constructor() {
    super();
  }

  createOrUpdateBusinessAdditionToNtn = async (req, res) => {
    try {
      const userId = req.user.id;
      const data = { ...req.body };
      
      // Validate input data
      const result = BusinessAdditionToNtnValidator.validateCreateBusinessAdditionToNtn(data);
      if (!result.status) {
        return this.validationErrorResponse(
          res,
          result?.message || "Invalid data"
        );
      }
      
      const { businessName } = result.data;
      
      // Check if a registration already exists for this user and business name
      let existingRegistration = null;
      if (businessName) {
        existingRegistration = await BusinessAdditionToNtnRepo.findByUserIdAndBusinessName(userId, businessName);
      }
      
      if (existingRegistration) {
        // Update existing registration
        await BusinessAdditionToNtnRepo.updateBusinessAdditionToNtn(existingRegistration.id, result.data);
        
        // Fetch the updated registration
        const updatedRegistration = await BusinessAdditionToNtnRepo.findBusinessAdditionToNtn({
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
          "Business addition to NTN updated successfully"
        );
      }
      
      // Create new registration
      const registration = await BusinessAdditionToNtnRepo.createBusinessAdditionToNtn({
        ...result.data,
        userId
      });
      
      return this.successResponse(
        201,
        res,
        registration,
        "Business addition to NTN created successfully"
      );
    } catch (error) {
      console.error("Error creating/updating business addition to NTN:", error);
      return this.serverErrorResponse(
        res,
        "Failed to create/update business addition to NTN"
      );
    }
  };

  getAllBusinessAdditionToNtns = async (req, res) => {
    try {
      // Extract query parameters
      const {
        page = 1,
        limit = 10,
        search = "",
        sortBy = "createdAt",
        sortOrder = "DESC",
        applicationStatus,
        invoiceStatus,
        businessName
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
          { cnicOrNtnNumber: { [db.Sequelize.Op.like]: `%${search}%` } },
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
      
      if (businessName) {
        whereClause.businessName = businessName;
      }
      
      // Execute query with pagination
      const { count, rows: registrations } = await BusinessAdditionToNtnRepo.findAndCountBusinessAdditionToNtns({
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
        "Business addition to NTN registrations retrieved successfully"
      );
    } catch (error) {
      console.error("Error fetching business addition to NTN registrations:", error);
      return this.serverErrorResponse(
        res,
        "Failed to retrieve business addition to NTN registrations"
      );
    }
  };

  getBusinessAdditionToNtnById = async (req, res) => {
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
      
      const registration = await BusinessAdditionToNtnRepo.findBusinessAdditionToNtn({
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
          "Business addition to NTN registration not found"
        );
      }
      
      return this.successResponse(
        200,
        res,
        registration,
        "Business addition to NTN registration retrieved successfully"
      );
    } catch (error) {
      console.error("Error fetching business addition to NTN registration:", error);
      return this.serverErrorResponse(
        res,
        "Failed to retrieve business addition to NTN registration"
      );
    }
  };

  updateBusinessAdditionToNtn = async (req, res) => {
    try {
      const { id } = req.params;
      const data = { ...req.body };
      
      // Validate input data
      const result = BusinessAdditionToNtnValidator.validateUpdateBusinessAdditionToNtn(data);
      if (!result.status) {
        return this.validationErrorResponse(
          res,
          result?.message || "Invalid data"
        );
      }
      
      // Check if the registration exists
      const registration = await BusinessAdditionToNtnRepo.findBusinessAdditionToNtn({
        where: { id }
      });
      
      if (!registration) {
        return this.errorResponse(
          404,
          res,
          "Business addition to NTN registration not found"
        );
      }
      
      // Update the registration
      await BusinessAdditionToNtnRepo.updateBusinessAdditionToNtn(id, result.data);
      
      // Fetch the updated registration
      const updatedRegistration = await BusinessAdditionToNtnRepo.findBusinessAdditionToNtn({
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
        "Business addition to NTN registration updated successfully"
      );
    } catch (error) {
      console.error("Error updating business addition to NTN registration:", error);
      return this.serverErrorResponse(
        res,
        "Failed to update business addition to NTN registration"
      );
    }
  };
}

module.exports = new BusinessAdditionToNtnController(); 