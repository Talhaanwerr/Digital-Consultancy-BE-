const BaseController = require('./BaseController');
const PvtLtdRegistrationRepo = require('../repos/PvtLtdRegistrationRepo');
const PvtLtdDirectorRepo = require('../repos/PvtLtdDirectorRepo');
const PvtLtdNomineeRepo = require('../repos/PvtLtdNomineeRepo');
const PvtLtdRegistrationValidator = require('../validators/PvtLtdRegistrationValidator');
const db = require('../models');
const { constants, ROLES } = require('../constants/constants');
const RoleRepo = require('../repos/RoleRepo');

class PvtLtdRegistrationController extends BaseController {
  constructor() {
    super();
  }

  createPvtLtdRegistration = async (req, res) => {
    // Start a transaction
    const transaction = await db.sequelize.transaction();

    try {
      const userId = req.user.id;
      const data = { ...req.body };
      
      // Validate input data
      const result = PvtLtdRegistrationValidator.validateCreatePvtLtdRegistration(data);
      if (!result.status) {
        return this.validationErrorResponse(
          res,
          result?.message || "Invalid data"
        );
      }
      
      // Extract directors, nominee, and other data
      const { directors, nominee, ...pvtLtdData } = result.data;
      
      // Create PvtLtd registration
      const pvtLtdRegistration = await PvtLtdRegistrationRepo.createPvtLtdRegistration({
        ...pvtLtdData,
        userId
      }, transaction);
      
      // Create directors for the PvtLtd registration
      const directorsWithRegId = directors.map(director => ({
        ...director,
        pvtLtdRegistrationId: pvtLtdRegistration.id
      }));
      
      await PvtLtdDirectorRepo.bulkCreatePvtLtdDirectors(directorsWithRegId, transaction);
      
      // Create nominee if single director
      if (pvtLtdData.isSingleDirector && nominee) {
        await PvtLtdNomineeRepo.createPvtLtdNominee({
          ...nominee,
          pvtLtdRegistrationId: pvtLtdRegistration.id
        }, transaction);
      }
      
      // Commit the transaction
      await transaction.commit();
      
      // Fetch the created PvtLtd registration with directors and nominee
      const createdPvtLtdRegistration = await PvtLtdRegistrationRepo.findPvtLtdRegistration({
        where: { id: pvtLtdRegistration.id },
        include: [
          {
            model: db.User,
            as: "user",
            attributes: ["id", "firstName", "lastName", "email"]
          },
          {
            model: db.PvtLtdDirector,
            as: "directors"
          },
          {
            model: db.PvtLtdNominee,
            as: "nominee"
          }
        ]
      });
      
      return this.successResponse(
        201,
        res,
        createdPvtLtdRegistration,
        "Private Limited Company registration created successfully"
      );
    } catch (error) {
      // Rollback the transaction in case of error
      console.error("Error creating Private Limited Company registration:", error);
      await transaction.rollback();
      
      return this.serverErrorResponse(
        res,
        "Failed to create Private Limited Company registration"
      );
    }
  };

  updatePvtLtdRegistration = async (req, res) => {
    // Start a transaction
    const transaction = await db.sequelize.transaction();

    try {
      const { id } = req.params;
      const userId = req.user.id;
      const data = { ...req.body };
      
      // Validate input data
      const result = PvtLtdRegistrationValidator.validateUpdatePvtLtdRegistration(data);
      if (!result.status) {
        return this.validationErrorResponse(
          res,
          result?.message || "Invalid data"
        );
      }
      
      // Check if the PvtLtd registration exists and belongs to the user
      const pvtLtdRegistration = await PvtLtdRegistrationRepo.findPvtLtdRegistration({
        where: { id }
      });
      
      if (!pvtLtdRegistration) {
        await transaction.rollback();
        return this.errorResponse(
          404,
          res,
          "Private Limited Company registration not found"
        );
      }
      
      // Check if the user is authorized to update this record
      if (pvtLtdRegistration.userId !== userId) {
        // Check if user is admin
        const role = await RoleRepo.findOne({
          where: { id: req.user.roleId },
          attributes: ['name']
        });
        
        const isAdmin = role && (role.name === ROLES.ADMIN || role.name === ROLES.SUPER_ADMIN);
        
        if (!isAdmin) {
          await transaction.rollback();
          return this.errorResponse(
            403,
            res,
            "Unauthorized access"
          );
        }
      }
      
      // Extract directors, nominee, and other data
      const { directors, nominee, ...pvtLtdData } = result.data;
      
      // Update PvtLtd registration
      await PvtLtdRegistrationRepo.updatePvtLtdRegistration(id, pvtLtdData, transaction);
      
      // If directors are provided, replace them
      if (directors && directors.length > 0) {
        // Delete existing directors
        await PvtLtdDirectorRepo.deletePvtLtdDirectorsByPvtLtdRegistrationId(id, transaction);
        
        // Create new directors
        const directorsWithRegId = directors.map(director => ({
          ...director,
          pvtLtdRegistrationId: id
        }));
        
        await PvtLtdDirectorRepo.bulkCreatePvtLtdDirectors(directorsWithRegId, transaction);
      }
      
      // Handle nominee based on isSingleDirector flag
      const isSingleDirector = pvtLtdData.isSingleDirector !== undefined 
        ? pvtLtdData.isSingleDirector 
        : pvtLtdRegistration.isSingleDirector;
      
      if (isSingleDirector && nominee) {
        // Upsert nominee
        await PvtLtdNomineeRepo.upsertPvtLtdNominee({
          ...nominee,
          pvtLtdRegistrationId: id
        }, transaction);
      } else if (!isSingleDirector) {
        // Delete nominee if exists and isSingleDirector is false
        await PvtLtdNomineeRepo.deletePvtLtdNomineeByPvtLtdRegistrationId(id, transaction);
      }
      
      // Commit the transaction
      await transaction.commit();
      
      // Fetch the updated PvtLtd registration with directors and nominee
      const updatedPvtLtdRegistration = await PvtLtdRegistrationRepo.findPvtLtdRegistration({
        where: { id },
        include: [
          {
            model: db.User,
            as: "user",
            attributes: ["id", "firstName", "lastName", "email"]
          },
          {
            model: db.PvtLtdDirector,
            as: "directors"
          },
          {
            model: db.PvtLtdNominee,
            as: "nominee"
          }
        ]
      });
      
      return this.successResponse(
        200,
        res,
        updatedPvtLtdRegistration,
        "Private Limited Company registration updated successfully"
      );
    } catch (error) {
      // Rollback the transaction in case of error
      console.error("Error updating Private Limited Company registration:", error);
      await transaction.rollback();
      
      return this.serverErrorResponse(
        res,
        "Failed to update Private Limited Company registration"
      );
    }
  };

  getAllPvtLtdRegistrations = async (req, res) => {
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
        isSingleDirector
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
      
      if (isSingleDirector !== undefined) {
        whereClause.isSingleDirector = isSingleDirector === 'true';
      }
      
      // Execute query with pagination
      const { count, rows: pvtLtdRegistrations } = await PvtLtdRegistrationRepo.findAndCountPvtLtdRegistrations({
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
            model: db.PvtLtdDirector,
            as: "directors"
          },
          {
            model: db.PvtLtdNominee,
            as: "nominee"
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
          pvtLtdRegistrations,
          pagination: {
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages,
            hasNextPage,
            hasPrevPage
          }
        },
        "Private Limited Company registrations retrieved successfully"
      );
    } catch (error) {
      console.error("Error fetching Private Limited Company registrations:", error);
      return this.serverErrorResponse(
        res,
        "Failed to retrieve Private Limited Company registrations"
      );
    }
  };

  getPvtLtdRegistrationById = async (req, res) => {
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
      
      const pvtLtdRegistration = await PvtLtdRegistrationRepo.findPvtLtdRegistration({
        where: whereClause,
        include: [
          {
            model: db.User,
            as: "user",
            attributes: ["id", "firstName", "lastName", "email"]
          },
          {
            model: db.PvtLtdDirector,
            as: "directors"
          },
          {
            model: db.PvtLtdNominee,
            as: "nominee"
          }
        ]
      });
      
      if (!pvtLtdRegistration) {
        return this.errorResponse(
          404,
          res,
          "Private Limited Company registration not found"
        );
      }
      
      return this.successResponse(
        200,
        res,
        pvtLtdRegistration,
        "Private Limited Company registration retrieved successfully"
      );
    } catch (error) {
      console.error("Error fetching Private Limited Company registration:", error);
      return this.serverErrorResponse(
        res,
        "Failed to retrieve Private Limited Company registration"
      );
    }
  };
}

module.exports = new PvtLtdRegistrationController(); 