const BaseController = require("./BaseController.js");
const LlpRegistrationRepo = require("../repos/LlpRegistrationRepo.js");
const LlpPartnerRepo = require("../repos/LlpPartnerRepo.js");
const LlpRegistrationValidator = require("../validators/LlpRegistrationValidator.js");
const db = require("../models/index.js");
const { ROLES } = require("../constants/constants.js");
const RoleRepo = require("../repos/RoleRepo.js");

class LlpRegistrationController extends BaseController {
  constructor() {
    super();
  }

  createLlpRegistration = async (req, res) => {
    // Start a transaction
    const transaction = await db.sequelize.transaction();

    try {
      const userId = req.user.id;
      const data = { ...req.body };
      
      // Validate input data
      const result = LlpRegistrationValidator.validateCreateLlpRegistration(data);
      if (!result.status) {
        return this.validationErrorResponse(
          res,
          result?.message || "Invalid data"
        );
      }
      
      // Extract partners from validated data
      const { partners, ...llpData } = result.data;
      
      // Create LLP registration
      const llpRegistration = await LlpRegistrationRepo.createLlpRegistration({
        ...llpData,
        userId
      }, transaction);
      
      // Create partners for the LLP registration
      const partnersWithLlpId = partners.map(partner => ({
        ...partner,
        llpRegistrationId: llpRegistration.id
      }));
      
      await LlpPartnerRepo.bulkCreateLlpPartners(partnersWithLlpId, transaction);
      
      // Commit the transaction
      await transaction.commit();
      
      // Fetch the created LLP registration with partners
      const createdLlpRegistration = await LlpRegistrationRepo.findLlpRegistration({
        where: { id: llpRegistration.id },
        include: [
          {
            model: db.User,
            as: "user",
            attributes: ["id", "firstName", "lastName", "email"]
          },
          {
            model: db.LlpPartner,
            as: "partners"
          }
        ]
      });
      
      return this.successResponse(
        201,
        res,
        createdLlpRegistration,
        "LLP registration created successfully"
      );
    } catch (error) {
      // Rollback the transaction in case of error
      await transaction.rollback();
      
      console.error("Error creating LLP registration:", error);
      return this.serverErrorResponse(
        res,
        "Failed to create LLP registration"
      );
    }
  };

  updateLlpRegistration = async (req, res) => {
    // Start a transaction
    const transaction = await db.sequelize.transaction();

    try {
      const { id } = req.params;
      const userId = req.user.id;
      const data = { ...req.body };
      
      // Validate input data
      const result = LlpRegistrationValidator.validateUpdateLlpRegistration(data);
      if (!result.status) {
        return this.validationErrorResponse(
          res,
          result?.message || "Invalid data"
        );
      }
      
      // Check if the LLP registration exists and belongs to the user
      const llpRegistration = await LlpRegistrationRepo.findLlpRegistration({
        where: { id, userId }
      });
      
      if (!llpRegistration) {
        await transaction.rollback();
        return this.errorResponse(
          404,
          res,
          "LLP registration not found"
        );
      }
      
      // Extract partners from validated data
      const { partners, ...llpData } = result.data;
      
      // Update LLP registration
      await LlpRegistrationRepo.updateLlpRegistration(id, llpData, transaction);
      
      // Delete existing partners
      await LlpPartnerRepo.deleteLlpPartnersByLlpRegistrationId(id, transaction);
      
      // Create new partners
      if (partners && partners.length > 0) {
        const partnersWithLlpId = partners.map(partner => ({
          ...partner,
          llpRegistrationId: id
        }));
        
        await LlpPartnerRepo.bulkCreateLlpPartners(partnersWithLlpId, transaction);
      }
      
      // Commit the transaction
      await transaction.commit();
      
      // Fetch the updated LLP registration with partners
      const updatedLlpRegistration = await LlpRegistrationRepo.findLlpRegistration({
        where: { id },
        include: [
          {
            model: db.User,
            as: "user",
            attributes: ["id", "firstName", "lastName", "email"]
          },
          {
            model: db.LlpPartner,
            as: "partners"
          }
        ]
      });
      
      return this.successResponse(
        200,
        res,
        updatedLlpRegistration,
        "LLP registration updated successfully"
      );
    } catch (error) {
      // Rollback the transaction in case of error
      await transaction.rollback();
      
      console.error("Error updating LLP registration:", error);
      return this.serverErrorResponse(
        res,
        "Failed to update LLP registration"
      );
    }
  };

  getAllLlpRegistrations = async (req, res) => {
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
      
      // Build the query
      const offset = (parseInt(page) - 1) * parseInt(limit);
      
      // Build where clause
      const whereClause = {};
      
      // If user is not an admin, only allow them to access their own records
      if (!isAdmin) {
        whereClause.userId = req.user.id;
      }
      
      // Add search functionality
      if (search) {
        whereClause[db.Sequelize.Op.or] = [
          { preferredName: { [db.Sequelize.Op.like]: `%${search}%` } },
          { secondName: { [db.Sequelize.Op.like]: `%${search}%` } },
          { thirdName: { [db.Sequelize.Op.like]: `%${search}%` } },
          { companyAddress: { [db.Sequelize.Op.like]: `%${search}%` } }
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
      const { count, rows: llpRegistrations } = await LlpRegistrationRepo.findAndCountLlpRegistrations({
        where: whereClause,
        order: [[sortBy, sortOrder]],
        limit: parseInt(limit),
        offset,
        include: [
          {
            model: db.User,
            as: "user",
            attributes: ["id", "firstName", "lastName", "email"]
          },
          {
            model: db.LlpPartner,
            as: "partners"
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
          llpRegistrations,
          pagination: {
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages,
            hasNextPage,
            hasPrevPage
          }
        },
        "LLP registrations retrieved successfully"
      );
    } catch (error) {
      console.error("Error fetching LLP registrations:", error);
      return this.serverErrorResponse(
        res,
        "Failed to retrieve LLP registrations"
      );
    }
  };

  getLlpRegistrationById = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      
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
        whereClause.userId = userId;
      }
      
      const llpRegistration = await LlpRegistrationRepo.findLlpRegistration({
        where: whereClause,
        include: [
          {
            model: db.User,
            as: "user",
            attributes: ["id", "firstName", "lastName", "email"]
          },
          {
            model: db.LlpPartner,
            as: "partners"
          }
        ]
      });
      
      if (!llpRegistration) {
        return this.errorResponse(
          404,
          res,
          "LLP registration not found"
        );
      }
      
      return this.successResponse(
        200,
        res,
        llpRegistration,
        "LLP registration retrieved successfully"
      );
    } catch (error) {
      console.error("Error fetching LLP registration:", error);
      return this.serverErrorResponse(
        res,
        "Failed to retrieve LLP registration"
      );
    }
  };
}

module.exports = new LlpRegistrationController(); 