const BaseController = require("./BaseController.js");
const IndividualTaxReturnRepo = require("../repos/IndividualTaxReturnRepo.js");
const TaxDeductionCategoryRepo = require("../repos/TaxDeductionCategoryRepo.js");
const DeductionBankRepo = require("../repos/DeductionBankRepo.js");
const DeductionVehicleRepo = require("../repos/DeductionVehicleRepo.js");
const DeductionUtilitiesRepo = require("../repos/DeductionUtilitiesRepo.js");
const DeductionPropertyRepo = require("../repos/DeductionPropertyRepo.js");
const DeductionOthersRepo = require("../repos/DeductionOthersRepo.js");

const TaxDeductionCategoryValidator = require("../validators/TaxDeductionCategoryValidator.js");
const DeductionBankValidator = require("../validators/DeductionBankValidator.js");
const DeductionVehicleValidator = require("../validators/DeductionVehicleValidator.js");
const DeductionUtilitiesValidator = require("../validators/DeductionUtilitiesValidator.js");
const DeductionPropertyValidator = require("../validators/DeductionPropertyValidator.js");
const DeductionOthersValidator = require("../validators/DeductionOthersValidator.js");

const db = require("../models/index.js");

class TaxDeductionController extends BaseController {
  constructor() {
    super();
  }

  // New method to get all tax deduction categories
  getAllDeductionCategories = async (req, res) => {
    try {
      // Fetch all categories from the database
      const categories = await TaxDeductionCategoryRepo.findAllCategories();
      
      return this.successResponse(
        200,
        res,
        categories,
        "All tax deduction categories retrieved successfully"
      );
    } catch (error) {
      console.error("Error retrieving all tax deduction categories:", error);
      return this.serverErrorResponse(res, "Failed to retrieve tax deduction categories");
    }
  };

  // Categories endpoints
  saveDeductionCategories = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    
    try {
      const userId = req.user.id;
      const data = { ...req.body };
      
      // Validate input data
      const validationResult = TaxDeductionCategoryValidator.validateCategorySelection(data);
      if (!validationResult.status) {
        return this.validationErrorResponse(
          res,
          validationResult?.message || "Invalid data"
        );
      }
      
      const { taxYear, categoryIds } = validationResult.data;
      
      // Find or create tax return
      let taxReturn = await IndividualTaxReturnRepo.findTaxReturn({
        where: { userId, taxYear },
        transaction
      });
      
      if (!taxReturn) {
        taxReturn = await IndividualTaxReturnRepo.createTaxReturn(
          {
            filingFor: "Self", // Default value
            taxYear,
            userId,
            applicationStatus: "draft",
            status: "incomplete"
          },
          { transaction }
        );
      }
      
      // Save selected categories
      await TaxDeductionCategoryRepo.saveCategoriesForTaxReturn(
        taxReturn.id,
        categoryIds,
        transaction
      );
      
      await transaction.commit();
      
      // Fetch the updated data
      const categories = await TaxDeductionCategoryRepo.findCategoriesByTaxReturnId(taxReturn.id);
      
      return this.successResponse(
        200,
        res,
        categories,
        "Tax deduction categories saved successfully"
      );
    } catch (error) {
      await transaction.rollback();
      console.error("Error saving tax deduction categories:", error);
      return this.serverErrorResponse(res, "Failed to save tax deduction categories");
    }
  };

  getDeductionCategories = async (req, res) => {
    try {
      const userId = req.user.id;
      const { year } = req.params;
      
      if (!year) {
        return this.validationErrorResponse(res, "Tax year is required");
      }
      
      // Find tax return for this user and year
      const taxReturn = await IndividualTaxReturnRepo.findTaxReturn({
        where: { userId, taxYear: year }
      });
      
      if (!taxReturn) {
        return this.successResponse(
          200,
          res,
          [],
          "No tax return found for the specified year"
        );
      }
      
      // Find tax deduction categories for this tax return
      const categories = await TaxDeductionCategoryRepo.findCategoriesByTaxReturnId(taxReturn.id);
      
      return this.successResponse(
        200,
        res,
        categories || [],
        "Tax deduction categories retrieved successfully"
      );
    } catch (error) {
      console.error("Error retrieving tax deduction categories:", error);
      return this.serverErrorResponse(res, "Failed to retrieve tax deduction categories");
    }
  };

  // Bank deductions endpoints
  saveBankDeductions = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    
    try {
      const userId = req.user.id;
      const data = { ...req.body };
      
      // Validate input data
      const validationResult = DeductionBankValidator.validateBankData(data);
      if (!validationResult.status) {
        return this.validationErrorResponse(
          res,
          validationResult?.message || "Invalid data"
        );
      }
      
      const { taxYear, data: bankData } = validationResult.data;
      
      // Find or create tax return
      let taxReturn = await IndividualTaxReturnRepo.findTaxReturn({
        where: { userId, taxYear },
        transaction
      });
      
      if (!taxReturn) {
        taxReturn = await IndividualTaxReturnRepo.createTaxReturn(
          {
            filingFor: "Self", // Default value
            taxYear,
            userId,
            applicationStatus: "draft",
            status: "incomplete"
          },
          { transaction }
        );
      }
      
      // Delete existing bank deductions
      await DeductionBankRepo.deleteByTaxReturnId(taxReturn.id, transaction);
      
      // Create new bank deductions with tax return ID
      const bankEntries = bankData.map(item => ({
        individualTaxReturnId: taxReturn.id,
        ...item
      }));
      
      await DeductionBankRepo.bulkCreateDeductionBank(bankEntries, transaction);
      
      await transaction.commit();
      
      // Fetch the updated data
      const bankDeductions = await DeductionBankRepo.findByTaxReturnId(taxReturn.id);
      
      return this.successResponse(
        200,
        res,
        bankDeductions,
        "Bank deductions saved successfully"
      );
    } catch (error) {
      await transaction.rollback();
      console.error("Error saving bank deductions:", error);
      return this.serverErrorResponse(res, "Failed to save bank deductions");
    }
  };

  getBankDeductions = async (req, res) => {
    try {
      const userId = req.user.id;
      const { year } = req.params;
      
      if (!year) {
        return this.validationErrorResponse(res, "Tax year is required");
      }
      
      // Find tax return for this user and year
      const taxReturn = await IndividualTaxReturnRepo.findTaxReturn({
        where: { userId, taxYear: year }
      });
      
      if (!taxReturn) {
        return this.successResponse(
          200,
          res,
          [],
          "No tax return found for the specified year"
        );
      }
      
      // Find bank deductions for this tax return
      const bankDeductions = await DeductionBankRepo.findByTaxReturnId(taxReturn.id);
      
      return this.successResponse(
        200,
        res,
        bankDeductions || [],
        "Bank deductions retrieved successfully"
      );
    } catch (error) {
      console.error("Error retrieving bank deductions:", error);
      return this.serverErrorResponse(res, "Failed to retrieve bank deductions");
    }
  };

  // Vehicle deductions endpoints
  saveVehicleDeductions = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    
    try {
      const userId = req.user.id;
      const data = { ...req.body };
      
      // Validate input data
      const validationResult = DeductionVehicleValidator.validateVehicleData(data);
      if (!validationResult.status) {
        return this.validationErrorResponse(
          res,
          validationResult?.message || "Invalid data"
        );
      }
      
      const { taxYear, data: vehicleData } = validationResult.data;
      
      // Find or create tax return
      let taxReturn = await IndividualTaxReturnRepo.findTaxReturn({
        where: { userId, taxYear },
        transaction
      });
      
      if (!taxReturn) {
        taxReturn = await IndividualTaxReturnRepo.createTaxReturn(
          {
            filingFor: "Self", // Default value
            taxYear,
            userId,
            applicationStatus: "draft",
            status: "incomplete"
          },
          { transaction }
        );
      }
      
      // Delete existing vehicle deductions
      await DeductionVehicleRepo.deleteByTaxReturnId(taxReturn.id, transaction);
      
      // Create new vehicle deductions with tax return ID
      const vehicleEntries = vehicleData.map(item => ({
        individualTaxReturnId: taxReturn.id,
        ...item
      }));
      
      await DeductionVehicleRepo.bulkCreateDeductionVehicle(vehicleEntries, transaction);
      
      await transaction.commit();
      
      // Fetch the updated data
      const vehicleDeductions = await DeductionVehicleRepo.findByTaxReturnId(taxReturn.id);
      
      return this.successResponse(
        200,
        res,
        vehicleDeductions,
        "Vehicle deductions saved successfully"
      );
    } catch (error) {
      await transaction.rollback();
      console.error("Error saving vehicle deductions:", error);
      return this.serverErrorResponse(res, "Failed to save vehicle deductions");
    }
  };

  getVehicleDeductions = async (req, res) => {
    try {
      const userId = req.user.id;
      const { year } = req.params;
      
      if (!year) {
        return this.validationErrorResponse(res, "Tax year is required");
      }
      
      // Find tax return for this user and year
      const taxReturn = await IndividualTaxReturnRepo.findTaxReturn({
        where: { userId, taxYear: year }
      });
      
      if (!taxReturn) {
        return this.successResponse(
          200,
          res,
          [],
          "No tax return found for the specified year"
        );
      }
      
      // Find vehicle deductions for this tax return
      const vehicleDeductions = await DeductionVehicleRepo.findByTaxReturnId(taxReturn.id);
      
      return this.successResponse(
        200,
        res,
        vehicleDeductions || [],
        "Vehicle deductions retrieved successfully"
      );
    } catch (error) {
      console.error("Error retrieving vehicle deductions:", error);
      return this.serverErrorResponse(res, "Failed to retrieve vehicle deductions");
    }
  };

  // Utilities deductions endpoints
  saveUtilitiesDeductions = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    
    try {
      const userId = req.user.id;
      const data = { ...req.body };
      
      // Validate input data
      const validationResult = DeductionUtilitiesValidator.validateUtilitiesData(data);
      if (!validationResult.status) {
        return this.validationErrorResponse(
          res,
          validationResult?.message || "Invalid data"
        );
      }
      
      const { taxYear, data: utilitiesData } = validationResult.data;
      
      // Find or create tax return
      let taxReturn = await IndividualTaxReturnRepo.findTaxReturn({
        where: { userId, taxYear },
        transaction
      });
      
      if (!taxReturn) {
        taxReturn = await IndividualTaxReturnRepo.createTaxReturn(
          {
            filingFor: "Self", // Default value
            taxYear,
            userId,
            applicationStatus: "draft",
            status: "incomplete"
          },
          { transaction }
        );
      }
      
      // Delete existing utilities deductions
      await DeductionUtilitiesRepo.deleteByTaxReturnId(taxReturn.id, transaction);
      
      // Create new utilities deductions with tax return ID
      const utilitiesEntries = utilitiesData.map(item => ({
        individualTaxReturnId: taxReturn.id,
        ...item
      }));
      
      await DeductionUtilitiesRepo.bulkCreateDeductionUtilities(utilitiesEntries, transaction);
      
      await transaction.commit();
      
      // Fetch the updated data
      const utilitiesDeductions = await DeductionUtilitiesRepo.findByTaxReturnId(taxReturn.id);
      
      return this.successResponse(
        200,
        res,
        utilitiesDeductions,
        "Utilities deductions saved successfully"
      );
    } catch (error) {
      await transaction.rollback();
      console.error("Error saving utilities deductions:", error);
      return this.serverErrorResponse(res, "Failed to save utilities deductions");
    }
  };

  getUtilitiesDeductions = async (req, res) => {
    try {
      const userId = req.user.id;
      const { year } = req.params;
      
      if (!year) {
        return this.validationErrorResponse(res, "Tax year is required");
      }
      
      // Find tax return for this user and year
      const taxReturn = await IndividualTaxReturnRepo.findTaxReturn({
        where: { userId, taxYear: year }
      });
      
      if (!taxReturn) {
        return this.successResponse(
          200,
          res,
          [],
          "No tax return found for the specified year"
        );
      }
      
      // Find utilities deductions for this tax return
      const utilitiesDeductions = await DeductionUtilitiesRepo.findByTaxReturnId(taxReturn.id);
      
      return this.successResponse(
        200,
        res,
        utilitiesDeductions || [],
        "Utilities deductions retrieved successfully"
      );
    } catch (error) {
      console.error("Error retrieving utilities deductions:", error);
      return this.serverErrorResponse(res, "Failed to retrieve utilities deductions");
    }
  };

  // Property deductions endpoints
  savePropertyDeductions = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    
    try {
      const userId = req.user.id;
      const data = { ...req.body };
      
      // Validate input data
      const validationResult = DeductionPropertyValidator.validatePropertyData(data);
      if (!validationResult.status) {
        return this.validationErrorResponse(
          res,
          validationResult?.message || "Invalid data"
        );
      }
      
      const { taxYear, data: propertyData } = validationResult.data;
      
      // Find or create tax return
      let taxReturn = await IndividualTaxReturnRepo.findTaxReturn({
        where: { userId, taxYear },
        transaction
      });
      
      if (!taxReturn) {
        taxReturn = await IndividualTaxReturnRepo.createTaxReturn(
          {
            filingFor: "Self", // Default value
            taxYear,
            userId,
            applicationStatus: "draft",
            status: "incomplete"
          },
          { transaction }
        );
      }
      
      // Delete existing property deductions
      await DeductionPropertyRepo.deleteByTaxReturnId(taxReturn.id, transaction);
      
      // Create new property deductions with tax return ID
      const propertyEntries = propertyData.map(item => ({
        individualTaxReturnId: taxReturn.id,
        ...item
      }));
      
      await DeductionPropertyRepo.bulkCreateDeductionProperty(propertyEntries, transaction);
      
      await transaction.commit();
      
      // Fetch the updated data
      const propertyDeductions = await DeductionPropertyRepo.findByTaxReturnId(taxReturn.id);
      
      return this.successResponse(
        200,
        res,
        propertyDeductions,
        "Property deductions saved successfully"
      );
    } catch (error) {
      await transaction.rollback();
      console.error("Error saving property deductions:", error);
      return this.serverErrorResponse(res, "Failed to save property deductions");
    }
  };

  getPropertyDeductions = async (req, res) => {
    try {
      const userId = req.user.id;
      const { year } = req.params;
      
      if (!year) {
        return this.validationErrorResponse(res, "Tax year is required");
      }
      
      // Find tax return for this user and year
      const taxReturn = await IndividualTaxReturnRepo.findTaxReturn({
        where: { userId, taxYear: year }
      });
      
      if (!taxReturn) {
        return this.successResponse(
          200,
          res,
          [],
          "No tax return found for the specified year"
        );
      }
      
      // Find property deductions for this tax return
      const propertyDeductions = await DeductionPropertyRepo.findByTaxReturnId(taxReturn.id);
      
      return this.successResponse(
        200,
        res,
        propertyDeductions || [],
        "Property deductions retrieved successfully"
      );
    } catch (error) {
      console.error("Error retrieving property deductions:", error);
      return this.serverErrorResponse(res, "Failed to retrieve property deductions");
    }
  };

  // Other deductions endpoints
  saveOtherDeductions = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    
    try {
      const userId = req.user.id;
      const data = { ...req.body };
      
      // Validate input data
      const validationResult = DeductionOthersValidator.validateOthersData(data);
      if (!validationResult.status) {
        return this.validationErrorResponse(
          res,
          validationResult?.message || "Invalid data"
        );
      }
      
      const { taxYear, data: otherData } = validationResult.data;
      
      // Find or create tax return
      let taxReturn = await IndividualTaxReturnRepo.findTaxReturn({
        where: { userId, taxYear },
        transaction
      });
      
      if (!taxReturn) {
        taxReturn = await IndividualTaxReturnRepo.createTaxReturn(
          {
            filingFor: "Self", // Default value
            taxYear,
            userId,
            applicationStatus: "draft",
            status: "incomplete"
          },
          { transaction }
        );
      }
      
      // Upsert other deductions with tax return ID
      await DeductionOthersRepo.upsertDeductionOthers(
        {
          individualTaxReturnId: taxReturn.id,
          ...otherData
        },
        transaction
      );
      
      await transaction.commit();
      
      // Fetch the updated data
      const otherDeductions = await DeductionOthersRepo.findByTaxReturnId(taxReturn.id);
      
      return this.successResponse(
        200,
        res,
        otherDeductions,
        "Other deductions saved successfully"
      );
    } catch (error) {
      await transaction.rollback();
      console.error("Error saving other deductions:", error);
      return this.serverErrorResponse(res, "Failed to save other deductions");
    }
  };

  getOtherDeductions = async (req, res) => {
    try {
      const userId = req.user.id;
      const { year } = req.params;
      
      if (!year) {
        return this.validationErrorResponse(res, "Tax year is required");
      }
      
      // Find tax return for this user and year
      const taxReturn = await IndividualTaxReturnRepo.findTaxReturn({
        where: { userId, taxYear: year }
      });
      
      if (!taxReturn) {
        return this.successResponse(
          200,
          res,
          null,
          "No tax return found for the specified year"
        );
      }
      
      // Find other deductions for this tax return
      const otherDeductions = await DeductionOthersRepo.findByTaxReturnId(taxReturn.id);
      
      return this.successResponse(
        200,
        res,
        otherDeductions || null,
        otherDeductions ? "Other deductions retrieved successfully" : "No other deductions found"
      );
    } catch (error) {
      console.error("Error retrieving other deductions:", error);
      return this.serverErrorResponse(res, "Failed to retrieve other deductions");
    }
  };
}

module.exports = new TaxDeductionController(); 