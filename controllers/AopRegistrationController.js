const BaseController = require('./BaseController');
const AopRegistrationRepo = require('../repos/AopRegistrationRepo');
const AopPartnerRepo = require('../repos/AopPartnerRepo');
const AopRegistrationValidator = require('../validators/AopRegistrationValidator');
const db = require('../models');
const { constants, ROLES } = require('../constants/constants');
const RoleRepo = require('../repos/RoleRepo');

class AopRegistrationController extends BaseController {
  constructor() {
    super();
  }

  createAopRegistration = async (req, res) => {
    // Start a transaction
    const transaction = await db.sequelize.transaction();

    try {
      const userId = req.user.id;
      const data = { ...req.body };
      
      // Validate input data
      const result = AopRegistrationValidator.validateCreateAopRegistration(data);
      if (!result.status) {
        return this.validationErrorResponse(
          res,
          result?.message || "Invalid data"
        );
      }
      
      // Extract partners from validated data
      const { partners, ...aopData } = result.data;
      
      // Create AOP registration
      const aopRegistration = await AopRegistrationRepo.createAopRegistration({
        ...aopData,
        userId
      }, transaction);
      
      // Create partners for the AOP registration
      const partnersWithAopId = partners.map(partner => ({
        ...partner,
        aopRegistrationId: aopRegistration.id
      }));
      
      await AopPartnerRepo.bulkCreateAopPartners(partnersWithAopId, transaction);
      
      // Commit the transaction
      await transaction.commit();
      
      // Fetch the created AOP registration with partners
      const createdAopRegistration = await AopRegistrationRepo.findAopRegistration({
        where: { id: aopRegistration.id },
        include: [
          {
            model: db.User,
            as: "user",
            attributes: ["id", "firstName", "lastName", "email"]
          },
          {
            as: "partners",
            model: db.AopPartner
          }
        ]
      });
      
      return this.successResponse(
        201,
        res,
        createdAopRegistration,
        "AOP registration created successfully"
      );
    } catch (error) {
      // Rollback the transaction in case of error
      console.error("Error creating AOP registration:", error);
      await transaction.rollback();
      
      return this.serverErrorResponse(
        res,
        "Failed to create AOP registration"
      );
    }
  };

  updateAopRegistration = async (req, res) => {
    // Start a transaction
    const transaction = await db.sequelize.transaction();

    try {
      const { id } = req.params;
      const userId = req.user.id;
      const data = { ...req.body };
      
      // Validate input data
      const result = AopRegistrationValidator.validateUpdateAopRegistration(data);
      if (!result.status) {
        return this.validationErrorResponse(
          res,
          result?.message || "Invalid data"
        );
      }
      
      // Check if the AOP registration exists and belongs to the user
      const aopRegistration = await AopRegistrationRepo.findAopRegistration({
        where: { id }
      });
      
      if (!aopRegistration) {
        await transaction.rollback();
        return this.errorResponse(
          404,
          res,
          "AOP registration not found"
        );
      }
      
      // Check if the user is authorized to update this record
      if (aopRegistration.userId !== userId) {
        // Check if user is admin
        const role = await RoleRepo.findOne({
          where: { id: req.user.roleId },
          attributes: ['name']
        });
        
        const isAdmin = role && (role.name === constants.ROLES.ADMIN || role.name === constants.ROLES.SUPER_ADMIN);
        
        if (!isAdmin) {
          await transaction.rollback();
          return this.errorResponse(
            403,
            res,
            "Unauthorized access"
          );
        }
      }
      
      // Extract partners from validated data
      const { partners, ...aopData } = result.data;
      
      // Update AOP registration
      await AopRegistrationRepo.updateAopRegistration(id, aopData, transaction);
      
      // Delete existing partners
      await AopPartnerRepo.deleteAopPartnersByAopRegistrationId(id, transaction);
      
      // Create new partners
      if (partners && partners.length > 0) {
        const partnersWithAopId = partners.map(partner => ({
          ...partner,
          aopRegistrationId: id
        }));
        
        await AopPartnerRepo.bulkCreateAopPartners(partnersWithAopId, transaction);
      }
      
      // Commit the transaction
      await transaction.commit();
      
      // Fetch the updated AOP registration with partners
      const updatedAopRegistration = await AopRegistrationRepo.findAopRegistration({
        where: { id },
        include: [
          {
            model: db.User,
            as: "user",
            attributes: ["id", "firstName", "lastName", "email"]
          },
          {
            model: db.AopPartner,
            as: "partners"
          }
        ]
      });
      
      return this.successResponse(
        200,
        res,
        updatedAopRegistration,
        "AOP registration updated successfully"
      );
    } catch (error) {
      // Rollback the transaction in case of error
      console.error("Error updating AOP registration:", error);
      await transaction.rollback();
      
      return this.serverErrorResponse(
        res,
        "Failed to update AOP registration"
      );
    }
  };

  getAllAopRegistrations = async (req, res) => {
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
        const role = await RoleRepo.findOne({
          where: {
            id: req.user.roleId,
          },
          attributes: ['name']
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
      const { count, rows: aopRegistrations } = await AopRegistrationRepo.findAndCountAopRegistrations({
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
            as: "partners",
            model: db.AopPartner
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
          aopRegistrations,
          pagination: {
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages,
            hasNextPage,
            hasPrevPage
          }
        },
        "AOP registrations retrieved successfully"
      );
    } catch (error) {
      console.error("Error fetching AOP registrations:", error);
      return this.serverErrorResponse(
        res,
        "Failed to retrieve AOP registrations"
      );
    }
  };

  getAopRegistrationById = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      
      // Check if user is admin
      let isAdmin = false;
      try {
        const role = await RoleRepo.findOne({
          where: {
            id: req.user.roleId,
          },
          attributes: ['name']
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
      
      const aopRegistration = await AopRegistrationRepo.findAopRegistration({
        where: whereClause,
        include: [
          {
            as: "user",
            model: db.User,
            attributes: ["id", "firstName", "lastName", "email"]
          },
          {
            as: "partners",
            model: db.AopPartner
          }
        ]
      });
      
      if (!aopRegistration) {
        return this.errorResponse(
          404,
          res,
          "AOP registration not found"
        );
      }
      
      return this.successResponse(
        200,
        res,
        aopRegistration,
        "AOP registration retrieved successfully"
      );
    } catch (error) {
      console.error("Error fetching AOP registration:", error);
      return this.serverErrorResponse(
        res,
        "Failed to retrieve AOP registration"
      );
    }
  };
}

module.exports = new AopRegistrationController(); 