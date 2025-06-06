const BaseController = require("./BaseController.js");
const IndividualTaxReturnRepo = require("../repos/IndividualTaxReturnRepo.js");
const WealthStatementRepo = require("../repos/WealthStatementRepo.js");
const WealthStatementValidator = require("../validators/WealthStatementValidator.js");
const db = require("../models/index.js");

class WealthStatementController extends BaseController {
  constructor() {
    super();
  }

  // Save wealth statement data
  saveWealthStatement = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    
    try {
      const userId = req.user.id;
      const data = { ...req.body };
      
      // Validate input data
      const validationResult = WealthStatementValidator.validateWealthStatementData(data);
      if (!validationResult.status) {
        return this.validationErrorResponse(
          res,
          validationResult?.message || "Invalid data"
        );
      }
      
      const { taxYear, opening, assets, liabilities, expense } = validationResult.data;
      
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
      
      // Upsert wealth statement with tax return ID
      await WealthStatementRepo.upsertWealthStatement(
        {
          individualTaxReturnId: taxReturn.id,
          opening,
          assets,
          liabilities,
          expense
        },
        transaction
      );
      
      await transaction.commit();
      
      // Fetch the updated data
      const wealthStatement = await WealthStatementRepo.findByTaxReturnId(taxReturn.id);
      
      return this.successResponse(
        200,
        res,
        wealthStatement,
        "Wealth statement saved successfully"
      );
    } catch (error) {
      await transaction.rollback();
      console.error("Error saving wealth statement:", error);
      return this.serverErrorResponse(res, "Failed to save wealth statement");
    }
  };

  // Get wealth statement data
  getWealthStatement = async (req, res) => {
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
      
      // Find wealth statement for this tax return
      const wealthStatement = await WealthStatementRepo.findByTaxReturnId(taxReturn.id);
      
      return this.successResponse(
        200,
        res,
        wealthStatement || null,
        wealthStatement ? "Wealth statement retrieved successfully" : "No wealth statement found"
      );
    } catch (error) {
      console.error("Error retrieving wealth statement:", error);
      return this.serverErrorResponse(res, "Failed to retrieve wealth statement");
    }
  };
}

module.exports = new WealthStatementController(); 