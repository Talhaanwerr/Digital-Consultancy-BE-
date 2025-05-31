const BaseController = require("./BaseController.js");
const IndividualTaxReturnRepo = require("../repos/IndividualTaxReturnRepo.js");
const TaxBenefitCreditRepo = require("../repos/TaxBenefitCreditRepo.js");
const TaxBenefitCreditValidator = require("../validators/TaxBenefitCreditValidator.js");
const db = require("../models/index.js");

class TaxBenefitCreditController extends BaseController {
  constructor() {
    super();
  }

  saveTaxBenefitCredit = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    
    try {
      const userId = req.user.id;
      const data = { ...req.body };
      
      // Validate input data
      const result = TaxBenefitCreditValidator.validateTaxBenefitCredit(data);
      if (!result.status) {
        return this.validationErrorResponse(
          res,
          result?.message || "Invalid data"
        );
      }
      
      const { taxYear, ...taxBenefitData } = result.data;
      
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
      
      // Upsert tax benefit credit data
      await TaxBenefitCreditRepo.upsertTaxBenefitCredit(
        {
          individualTaxReturnId: taxReturn.id,
          ...taxBenefitData
        },
        { transaction }
      );
      
      await transaction.commit();
      
      // Fetch the updated data
      const taxBenefitCredit = await TaxBenefitCreditRepo.findByTaxReturnId(taxReturn.id);
      
      return this.successResponse(
        200,
        res,
        taxBenefitCredit,
        "Tax benefits and credits saved successfully"
      );
    } catch (error) {
      await transaction.rollback();
      console.error("Error saving tax benefits and credits:", error);
      return this.serverErrorResponse(res, "Failed to save tax benefits and credits");
    }
  };

  getTaxBenefitCredit = async (req, res) => {
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
      
      // Find tax benefit credits for this tax return
      const taxBenefitCredit = await TaxBenefitCreditRepo.findByTaxReturnId(taxReturn.id);
      
      return this.successResponse(
        200,
        res,
        taxBenefitCredit || null,
        taxBenefitCredit ? "Tax benefits and credits retrieved successfully" : "No tax benefits and credits found"
      );
    } catch (error) {
      console.error("Error retrieving tax benefits and credits:", error);
      return this.serverErrorResponse(res, "Failed to retrieve tax benefits and credits");
    }
  };
}

module.exports = new TaxBenefitCreditController(); 