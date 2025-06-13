const BaseController = require("./BaseController.js");
const IndividualTaxReturnRepo = require("../repos/IndividualTaxReturnRepo.js");
const IndividualTaxReturnBasicInfoRepo = require("../repos/IndividualTaxReturnBasicInfoRepo.js");
const IndividualTaxReturnPersonalInfoRepo = require("../repos/IndividualTaxReturnPersonalInfoRepo.js");
const IndividualTaxReturnFbrInfoRepo = require("../repos/IndividualTaxReturnFbrInfoRepo.js");
const IndividualTaxReturnValidator = require("../validators/IndividualTaxReturnValidator.js");
const db = require("../models/index.js");
const { rest } = require("lodash");
const { Op } = require("sequelize");

class IndividualTaxReturnController extends BaseController {
  constructor() {
    super();
  }

  getTaxReturnSnapshot = async (req, res) => {
    try {
      const userId = req.user.id;
      const { taxYear } = req.params;

      if (!taxYear) {
        return this.validationErrorResponse(res, "Tax year is required");
      }

      // Find the tax return with all associated data
      const taxReturn = await IndividualTaxReturnRepo.findTaxReturn({
        where: { userId, taxYear },
        include: [
          { model: db.IndividualTaxReturnBasicInfo, as: "basicInfo" },
          { model: db.IndividualTaxReturnPersonalInfo, as: "personalInfo" },
          { model: db.IndividualTaxReturnFbrInfo, as: "fbrInfo" },
          { model: db.SalaryIncome, as: "salaryIncome" },
          { model: db.PensionIncome, as: "pensionIncome" },
          { model: db.RentalIncome, as: "rentalIncome" },
          {
            model: db.IncomeSourceType,
            as: "incomeSources",
            through: { attributes: [] }, // Don't include junction table fields
          },
        ],
      });

      if (!taxReturn) {
        return this.errorResponse(
          404,
          res,
          "Tax return not found for the specified tax year"
        );
      }

      const { basicInfo, personalInfo, fbrInfo, incomeSources, salaryIncome, pensionIncome, rentalIncome, ...rest } =
        taxReturn;

      // Format response in the required structure
      const response = {
        individualTaxReturn: {
          filingFor: taxReturn.filingFor || "Self",
          taxYear: taxReturn.taxYear || null,
          applicationStatus: taxReturn.applicationStatus || null,
          invoiceStatus: taxReturn.invoiceStatus || null,
          receiptImageUrl: taxReturn.receiptImageUrl || null,
          infoTab: {
            basicInfo: basicInfo || null,
            personalInfo: personalInfo || null,
            fbrInfo: fbrInfo || null,
          },
          incomeTab: {
            incomeSources: incomeSources || [],
            salaryIncome: salaryIncome || null,
            pensionIncome: pensionIncome || null,
            rentalIncome: rentalIncome || null
          },
        },
      };

      return this.successResponse(
        200,
        res,
        response,
        "Tax return snapshot retrieved successfully"
      );
    } catch (error) {
      console.error("Error retrieving tax return snapshot:", error);
      return this.serverErrorResponse(
        res,
        "Failed to retrieve tax return snapshot"
      );
    }
  };

  saveReturnInfo = async (req, res) => {
    const transaction = await db.sequelize.transaction();

    try {
      const userId = req.user.id;
      const data = { ...req.body };

      // Validate input data
      const result = IndividualTaxReturnValidator.validateTaxReturnInfo(data);
      if (!result.status) {
        return this.validationErrorResponse(
          res,
          result?.message || "Invalid data"
        );
      }

      const {
        filingFor,
        taxYear,
        applicationStatus,
        invoiceStatus,
        receiptImageUrl,
        status,
        basicInfo,
        personalInfo,
        fbrInfo,
      } = result.data;

      // Check if a tax return already exists for this user and tax year
      let taxReturn = await IndividualTaxReturnRepo.findTaxReturn({
        where: { userId, taxYear },
        transaction,
      });

      if (taxReturn) {
        // Update existing tax return
        await IndividualTaxReturnRepo.updateTaxReturn(
          taxReturn.id,
          {
            filingFor,
            taxYear,
            applicationStatus,
            invoiceStatus,
            receiptImageUrl,
            status,
          },
          { transaction }
        );
      } else {
        // Create new tax return
        taxReturn = await IndividualTaxReturnRepo.createTaxReturn(
          {
            filingFor,
            taxYear,
            userId,
            applicationStatus,
            invoiceStatus,
            receiptImageUrl,
            status,
          },
          { transaction }
        );
      }

      // Handle basic info if provided
      if (basicInfo) {
        await IndividualTaxReturnBasicInfoRepo.upsertBasicInfo(
          {
            individualTaxReturnId: taxReturn.id,
            ...basicInfo,
          },
          { transaction }
        );
      }

      // Handle personal info if provided
      if (personalInfo) {
        await IndividualTaxReturnPersonalInfoRepo.upsertPersonalInfo(
          {
            individualTaxReturnId: taxReturn.id,
            ...personalInfo,
          },
          { transaction }
        );
      }

      // Handle FBR info if provided
      if (fbrInfo) {
        await IndividualTaxReturnFbrInfoRepo.upsertFbrInfo(
          {
            individualTaxReturnId: taxReturn.id,
            ...fbrInfo,
          },
          { transaction }
        );
      }

      await transaction.commit();

      // Fetch the complete tax return with all related info
      const completeTaxReturnInfo = await IndividualTaxReturnRepo.findTaxReturn(
        {
          where: { id: taxReturn.id },
          include: [
            { model: db.IndividualTaxReturnBasicInfo, as: "basicInfo" },
            { model: db.IndividualTaxReturnPersonalInfo, as: "personalInfo" },
            { model: db.IndividualTaxReturnFbrInfo, as: "fbrInfo" },
          ],
        }
      );

      return this.successResponse(
        200,
        res,
        completeTaxReturnInfo,
        "Tax return information saved successfully"
      );
    } catch (error) {
      await transaction.rollback();
      console.error("Error saving tax return info:", error);
      return this.serverErrorResponse(
        res,
        "Failed to save tax return information"
      );
    }
  };

  // New APIs below

  // API 1: Get all individual tax returns with filtering and search
  getAllIndividualTaxReturns = async (req, res) => {
    try {
      const {
        page = 1,
        limit = 10,
        taxYear,
        search,
        sortBy = "createdAt",
        sortOrder = "DESC",
      } = req.query;

      // Build the query
      const offset = (parseInt(page) - 1) * parseInt(limit);
      const whereClause = {};
      const userWhereClause = {};

      // Add tax year filter if provided
      if (taxYear) {
        whereClause.taxYear = taxYear;
      }

      // Add search functionality by email or phone
      if (search) {
        userWhereClause[Op.or] = [
          { email: { [Op.like]: `%${search}%` } },
          { phone: { [Op.like]: `%${search}%` } },
        ];
      }

      // Execute query with pagination
      const { count, rows: taxReturns } = await db.IndividualTaxReturn.findAndCountAll({
        include: [
          {
            model: db.User,
            as: "user",
            attributes: ["id", "firstName", "lastName", "email", "phone"],
            where: Object.keys(userWhereClause).length > 0 ? userWhereClause : undefined,
          },
          { 
            model: db.IndividualTaxReturnBasicInfo, 
            as: "basicInfo",
          },
        ],
        where: whereClause,
        order: [[sortBy, sortOrder.toUpperCase()]],
        limit: parseInt(limit),
        offset: offset,
        distinct: true,
      });

      // Calculate pagination metadata
      const totalPages = Math.ceil(count / parseInt(limit));
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;

      return this.successResponse(
        200,
        res,
        {
          taxReturns,
          pagination: {
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages,
            hasNextPage,
            hasPrevPage,
          },
        },
        "Individual tax returns retrieved successfully"
      );
    } catch (error) {
      console.error("Error retrieving individual tax returns:", error);
      return this.serverErrorResponse(
        res,
        "Failed to retrieve individual tax returns"
      );
    }
  };

  // API 2: Get individual tax return by ID with all associated data
  getIndividualTaxReturnById = async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return this.validationErrorResponse(res, "Tax return ID is required");
      }

      // Find the tax return with all associated data
      const taxReturn = await IndividualTaxReturnRepo.findTaxReturn({
        where: { id },
        include: [
          { 
            model: db.User, 
            as: "user",
            attributes: ["id", "firstName", "lastName", "email", "phone", "cnic"] 
          },
          { model: db.IndividualTaxReturnBasicInfo, as: "basicInfo" },
          { model: db.IndividualTaxReturnPersonalInfo, as: "personalInfo" },
          { model: db.IndividualTaxReturnFbrInfo, as: "fbrInfo" },
          { model: db.SalaryIncome, as: "salaryIncome" },
          { model: db.PensionIncome, as: "pensionIncome" },
          { model: db.RentalIncome, as: "rentalIncome" },
          {
            model: db.IncomeSourceType,
            as: "incomeSources",
            through: { attributes: [] },
          },
          { 
            model: db.TaxDeductionCategory, 
            as: "deductionCategories",
            through: { attributes: [] } 
          },
          { model: db.DeductionBank, as: "bankDeductions" },
          { model: db.DeductionVehicle, as: "vehicleDeductions" },
          { model: db.DeductionUtilities, as: "utilitiesDeductions" },
          { model: db.DeductionProperty, as: "propertyDeductions" },
          { model: db.DeductionOthers, as: "otherDeductions" },
          { model: db.TaxBenefitCredit, as: "taxBenefits" },
          { model: db.WealthStatement, as: "wealthStatement" }
        ],
      });

      if (!taxReturn) {
        return this.errorResponse(
          404,
          res,
          "Tax return not found"
        );
      }

      // Destructure the data for formatting response
      const { 
        user, basicInfo, personalInfo, fbrInfo, incomeSources, 
        salaryIncome, pensionIncome, rentalIncome,
        deductionCategories, bankDeductions, vehicleDeductions,
        utilitiesDeductions, propertyDeductions, otherDeductions,
        taxBenefits, wealthStatement,
        ...rest 
      } = taxReturn.toJSON();

      // Format response in a structured way
      const response = {
        id: taxReturn.id,
        filingFor: taxReturn.filingFor || "Self",
        taxYear: taxReturn.taxYear,
        applicationStatus: taxReturn.applicationStatus,
        invoiceStatus: taxReturn.invoiceStatus,
        receiptImageUrl: taxReturn.receiptImageUrl,
        status: taxReturn.status,
        createdAt: taxReturn.createdAt,
        updatedAt: taxReturn.updatedAt,
        user: user,
        infoTab: {
          basicInfo: basicInfo || null,
          personalInfo: personalInfo || null,
          fbrInfo: fbrInfo || null,
        },
        incomeTab: {
          incomeSources: incomeSources || [],
          salaryIncome: salaryIncome || null,
          pensionIncome: pensionIncome || null,
          rentalIncome: rentalIncome || null
        },
        deductionsTab: {
          categories: deductionCategories || [],
          bankDeductions: bankDeductions || [],
          vehicleDeductions: vehicleDeductions || [],
          utilitiesDeductions: utilitiesDeductions || [],
          propertyDeductions: propertyDeductions || [],
          otherDeductions: otherDeductions || null
        },
        taxBenefitsTab: taxBenefits || null,
        wealthStatementTab: wealthStatement || null
      };

      return this.successResponse(
        200,
        res,
        response,
        "Individual tax return retrieved successfully"
      );
    } catch (error) {
      console.error("Error retrieving individual tax return:", error);
      return this.serverErrorResponse(
        res,
        "Failed to retrieve individual tax return"
      );
    }
  };
}

module.exports = new IndividualTaxReturnController();
