const BaseController = require("./BaseController.js");
const IndividualTaxReturnRepo = require("../repos/IndividualTaxReturnRepo.js");
const SalaryIncomeRepo = require("../repos/SalaryIncomeRepo.js");
const PensionIncomeRepo = require("../repos/PensionIncomeRepo.js");
const RentalIncomeRepo = require("../repos/RentalIncomeRepo.js");
const SalaryIncomeValidator = require("../validators/SalaryIncomeValidator.js");
const PensionIncomeValidator = require("../validators/PensionIncomeValidator.js");
const RentalIncomeValidator = require("../validators/RentalIncomeValidator.js");
const db = require("../models/index.js");

class IncomeController extends BaseController {
  constructor() {
    super();
  }

  // Salary Income Endpoints
  saveSalaryIncome = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    
    try {
      const userId = req.user.id;
      const data = { ...req.body };
      
      // Validate input data
      const result = SalaryIncomeValidator.validateSalaryIncome(data);
      if (!result.status) {
        return this.validationErrorResponse(
          res,
          result?.message || "Invalid data"
        );
      }
      
      const { taxYear, ...salaryData } = result.data;
      
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
      
      // Upsert salary income data
      await SalaryIncomeRepo.upsertSalaryIncome(
        {
          individualTaxReturnId: taxReturn.id,
          ...salaryData
        },
        { transaction }
      );
      
      await transaction.commit();
      
      // Fetch the updated data
      const salaryIncome = await SalaryIncomeRepo.findByTaxReturnId(taxReturn.id);
      
      return this.successResponse(
        200,
        res,
        salaryIncome,
        "Salary income saved successfully"
      );
    } catch (error) {
      await transaction.rollback();
      console.error("Error saving salary income:", error);
      return this.serverErrorResponse(res, "Failed to save salary income");
    }
  };

  getSalaryIncome = async (req, res) => {
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
      
      // Find salary income for this tax return
      const salaryIncome = await SalaryIncomeRepo.findByTaxReturnId(taxReturn.id);
      
      return this.successResponse(
        200,
        res,
        salaryIncome || null,
        salaryIncome ? "Salary income retrieved successfully" : "No salary income found"
      );
    } catch (error) {
      console.error("Error retrieving salary income:", error);
      return this.serverErrorResponse(res, "Failed to retrieve salary income");
    }
  };

  // Pension Income Endpoints
  savePensionIncome = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    
    try {
      const userId = req.user.id;
      const data = { ...req.body };
      
      // Validate input data
      const result = PensionIncomeValidator.validatePensionIncome(data);
      if (!result.status) {
        return this.validationErrorResponse(
          res,
          result?.message || "Invalid data"
        );
      }
      
      const { taxYear, ...pensionData } = result.data;
      
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
      
      // Upsert pension income data
      await PensionIncomeRepo.upsertPensionIncome(
        {
          individualTaxReturnId: taxReturn.id,
          ...pensionData
        },
        { transaction }
      );
      
      await transaction.commit();
      
      // Fetch the updated data
      const pensionIncome = await PensionIncomeRepo.findByTaxReturnId(taxReturn.id);
      
      return this.successResponse(
        200,
        res,
        pensionIncome,
        "Pension income saved successfully"
      );
    } catch (error) {
      await transaction.rollback();
      console.error("Error saving pension income:", error);
      return this.serverErrorResponse(res, "Failed to save pension income");
    }
  };

  getPensionIncome = async (req, res) => {
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
      
      // Find pension income for this tax return
      const pensionIncome = await PensionIncomeRepo.findByTaxReturnId(taxReturn.id);
      
      return this.successResponse(
        200,
        res,
        pensionIncome || null,
        pensionIncome ? "Pension income retrieved successfully" : "No pension income found"
      );
    } catch (error) {
      console.error("Error retrieving pension income:", error);
      return this.serverErrorResponse(res, "Failed to retrieve pension income");
    }
  };

  // Rental Income Endpoints
  saveRentalIncome = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    
    try {
      const userId = req.user.id;
      const data = { ...req.body };
      
      // Validate input data
      const result = RentalIncomeValidator.validateRentalIncome(data);
      if (!result.status) {
        return this.validationErrorResponse(
          res,
          result?.message || "Invalid data"
        );
      }
      
      const { taxYear, ...rentalData } = result.data;
      
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
      
      // Upsert rental income data
      await RentalIncomeRepo.upsertRentalIncome(
        {
          individualTaxReturnId: taxReturn.id,
          ...rentalData
        },
        { transaction }
      );
      
      await transaction.commit();
      
      // Fetch the updated data
      const rentalIncome = await RentalIncomeRepo.findByTaxReturnId(taxReturn.id);
      
      return this.successResponse(
        200,
        res,
        rentalIncome,
        "Rental income saved successfully"
      );
    } catch (error) {
      await transaction.rollback();
      console.error("Error saving rental income:", error);
      return this.serverErrorResponse(res, "Failed to save rental income");
    }
  };

  getRentalIncome = async (req, res) => {
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
      
      // Find rental income for this tax return
      const rentalIncome = await RentalIncomeRepo.findByTaxReturnId(taxReturn.id);
      
      return this.successResponse(
        200,
        res,
        rentalIncome || null,
        rentalIncome ? "Rental income retrieved successfully" : "No rental income found"
      );
    } catch (error) {
      console.error("Error retrieving rental income:", error);
      return this.serverErrorResponse(res, "Failed to retrieve rental income");
    }
  };
}

module.exports = new IncomeController(); 