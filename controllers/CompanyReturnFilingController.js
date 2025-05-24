const BaseController = require("./BaseController.js");
const CompanyReturnFilingRepo = require("../repos/CompanyReturnFilingRepo.js");
const CompanyReturnFilingValidator = require("../validators/CompanyReturnFilingValidator.js");
const db = require("../models/index.js");

class CompanyReturnFilingController extends BaseController {
  constructor() {
    super();
  }

  createCompanyReturn = async (req, res) => {
    try {
      const userId = req.user.id;
      const data = { ...req.body };
      
      // Validate input data
      const result = CompanyReturnFilingValidator.validateCreateCompanyReturn(data);
      if (!result.status) {
        return this.validationErrorResponse(
          res,
          result?.message || "Invalid data"
        );
      }
      
      const { taxYear } = result.data;
      
      // Check if a company return already exists for this user and tax year
      const existingReturn = await CompanyReturnFilingRepo.findCompanyReturnByUserAndYear(userId, taxYear);
      
      if (existingReturn) {
        return this.errorResponse(
          409,
          res,
          `A company return for tax year ${taxYear} already exists`
        );
      }
      
      // Create new company return
      const companyReturn = await CompanyReturnFilingRepo.createCompanyReturn({
        ...result.data,
        userId
      });
      
      return this.successResponse(
        201,
        res,
        companyReturn,
        "Company return created successfully"
      );
    } catch (error) {
      console.error("Error creating company return:", error);
      return this.serverErrorResponse(
        res,
        "Failed to create company return"
      );
    }
  };

  getAllCompanyReturns = async (req, res) => {
    try {
      // Extract query parameters
      const {
        page = 1,
        limit = 10,
        search = "",
        sortBy = "createdAt",
        sortOrder = "DESC",
        taxYear,
        applicationStatus
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
          { businessNature: { [db.Sequelize.Op.like]: `%${search}%` } },
          { businessType: { [db.Sequelize.Op.like]: `%${search}%` } },
        ];
      }
      
      // Add additional filters
      if (taxYear) {
        whereClause.taxYear = taxYear;
      }
      
      if (applicationStatus) {
        whereClause.applicationStatus = applicationStatus;
      }
      
      // Execute query with pagination
      const { count, rows: companyReturns } = await CompanyReturnFilingRepo.findAndCountCompanyReturns({
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
          companyReturns,
          pagination: {
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages,
            hasNextPage,
            hasPrevPage
          }
        },
        "Company returns retrieved successfully"
      );
    } catch (error) {
      console.error("Error fetching company returns:", error);
      return this.serverErrorResponse(
        res,
        "Failed to retrieve company returns"
      );
    }
  };

  getCompanyReturnById = async (req, res) => {
    try {
      const { id } = req.params;
      
      const companyReturn = await CompanyReturnFilingRepo.findCompanyReturn({
        where: { 
          id,
          userId: req.user.id 
        },
        include: [
          {
            model: db.User,
            as: "user",
            attributes: ["id", "firstName", "lastName", "email"]
          }
        ]
      });
      
      if (!companyReturn) {
        return this.errorResponse(
          404,
          res,
          "Company return not found"
        );
      }
      
      return this.successResponse(
        200,
        res,
        companyReturn,
        "Company return retrieved successfully"
      );
    } catch (error) {
      console.error("Error fetching company return:", error);
      return this.serverErrorResponse(
        res,
        "Failed to retrieve company return"
      );
    }
  };

  updateCompanyReturn = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const data = { ...req.body };
      
      // Validate input data
      const result = CompanyReturnFilingValidator.validateUpdateCompanyReturn(data);
      if (!result.status) {
        return this.validationErrorResponse(
          res,
          result?.message || "Invalid data"
        );
      }
      
      // Check if the company return exists and belongs to the user
      const companyReturn = await CompanyReturnFilingRepo.findCompanyReturn({
        where: { 
          id,
          userId
        }
      });
      
      if (!companyReturn) {
        return this.errorResponse(
          404,
          res,
          "Company return not found"
        );
      }
      
      // If trying to update taxYear, check for conflicts
      if (result.data.taxYear && result.data.taxYear !== companyReturn.taxYear) {
        const existingReturn = await CompanyReturnFilingRepo.findCompanyReturnByUserAndYear(
          userId, 
          result.data.taxYear
        );
        
        if (existingReturn && existingReturn.id !== parseInt(id)) {
          return this.errorResponse(
            409,
            res,
            `A company return for tax year ${result.data.taxYear} already exists`
          );
        }
      }
      
      // Update the company return
      await CompanyReturnFilingRepo.updateCompanyReturn(id, result.data);
      
      // Fetch the updated return
      const updatedReturn = await CompanyReturnFilingRepo.findCompanyReturn({
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
        updatedReturn,
        "Company return updated successfully"
      );
    } catch (error) {
      console.error("Error updating company return:", error);
      return this.serverErrorResponse(
        res,
        "Failed to update company return"
      );
    }
  };

  deleteCompanyReturn = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      
      // Check if the company return exists and belongs to the user
      const companyReturn = await CompanyReturnFilingRepo.findCompanyReturn({
        where: { 
          id,
          userId
        }
      });
      
      if (!companyReturn) {
        return this.errorResponse(
          404,
          res,
          "Company return not found"
        );
      }
      
      // Delete the company return
      await CompanyReturnFilingRepo.deleteCompanyReturn(id);
      
      return this.successResponse(
        200,
        res,
        null,
        "Company return deleted successfully"
      );
    } catch (error) {
      console.error("Error deleting company return:", error);
      return this.serverErrorResponse(
        res,
        "Failed to delete company return"
      );
    }
  };
}

module.exports = new CompanyReturnFilingController(); 