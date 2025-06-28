const BaseController = require('./BaseController.js');
const IndividualTaxReturnRepo = require('../repos/IndividualTaxReturnRepo.js');
const db = require('../models/index.js');
const { computeReturnSummary } = require("../data/computeReturnSummary.js");
const RoleRepo = require('../repos/RoleRepo.js');

class WealthReconciliationController extends BaseController {
  constructor() {
    super();
  }

  getWealthReconciliation = async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return this.validationErrorResponse(res, "Tax return ID is required");
      }

      // Build where clause based on user role
      const whereClause = { id };

      // Get user role information
      let isAdmin = false;
      try {
        const role = await RoleRepo.findRole({
          where: {
            id: req.user.roleId,
          },
          attributes: ['name'],
          raw: true
        });

        
        isAdmin = role && (role.name === "Admin" || role.name === "Super Admin");
      } catch (error) {
        console.error("Error fetching role:", error);
        isAdmin = false;
      }

      // If user is not an admin, only allow them to access their own records
      if (!isAdmin) {
        whereClause.userId = req.user.id;
      }

      // Find the tax return with all associated data
      const taxReturn = await IndividualTaxReturnRepo.findTaxReturn({
        where: whereClause,
        include: [
          { model: db.IndividualTaxReturnBasicInfo, as: "basicInfo" },
          { model: db.IndividualTaxReturnPersonalInfo, as: "personalInfo" },
          { model: db.IndividualTaxReturnFbrInfo, as: "fbrInfo" },
          { model: db.SalaryIncome, as: "salaryIncome" },
          { model: db.PensionIncome, as: "pensionIncome" },
          { model: db.RentalIncome, as: "rentalIncome" },
          { model: db.PropertySaleIncome, as: "propertySaleIncome" },
          { model: db.AgricultureIncome, as: "agricultureIncome" },
          { model: db.PartnershipIncome, as: "partnershipIncome" },
          { model: db.FreelancerIncome, as: "freelancerIncome" },
          { model: db.ProfessionIncome, as: "professionIncome" },
          { model: db.CommissionIncome, as: "commissionIncome" },
          { model: db.DividendCapitalGainIncome, as: "dividendCapitalGainIncome" },
          { model: db.BusinessIncome, as: "businessIncome" },
          { model: db.OtherIncome, as: "otherIncomes" },
          { model: db.TaxDeductionCategory, as: "deductionCategories", through: { attributes: [] } },
          { model: db.DeductionBank, as: "bankDeductions" },
          { model: db.DeductionVehicle, as: "vehicleDeductions" },
          { model: db.DeductionUtilities, as: "utilitiesDeductions" },
          { model: db.DeductionProperty, as: "propertyDeductions" },
          { model: db.DeductionOthers, as: "otherDeductions" },
          { model: db.WealthStatement, as: "wealthStatement" },
          { 
            model: db.ProfitSavingParent, 
            as: "profitSavingParent",
            include: [
              { model: db.ProfitSavingBank, as: "bankProfit" },
              { model: db.ProfitSavingBehbood, as: "behboodProfit" },
              { model: db.ProfitSavingGovtScheme, as: "govtSchemeProfit" },
              { model: db.ProfitSavingPensionerBenefit, as: "pensionerBenefitProfit" }
            ]
          },
        ],
      });


      if (!taxReturn) {
        return this.errorResponse(404, res, "Tax return not found");
      }

      // Format the data for computeReturnSummary
      const formattedData = this.formatTaxReturnData(taxReturn);

      // Compute the wealth reconciliation summary
      const reconciliationSummary = computeReturnSummary(formattedData);

      return this.successResponse(
        200,
        res,
        {
          summary: reconciliationSummary,
          taxReturn: formattedData
        },
        "Wealth reconciliation completed successfully"
      );
    } catch (error) {
      console.error("Error computing wealth reconciliation:", error);
      return this.serverErrorResponse(
        res,
        "Failed to compute wealth reconciliation"
      );
    }
  };

  // Helper method to format tax return data for computeReturnSummary
  formatTaxReturnData = (taxReturn) => {
    if (!taxReturn) return {};

    const data = taxReturn.toJSON();
    
    // Format the data similar to the structure expected by computeReturnSummary
    return {
      id: data.id,
      taxYear: data.taxYear,
      incomeTab: {
        incomeSources: data.incomeSources || [],
        salaryIncome: data.salaryIncome || null,
        pensionIncome: data.pensionIncome || null,
        rentalIncome: data.rentalIncome || null,
        propertySaleIncome: data.propertySaleIncome || [],
        agricultureIncome: data.agricultureIncome || null,
        partnershipIncome: data.partnershipIncome || [],
        freelancerIncome: data.freelancerIncome || null,
        professionIncome: data.professionIncome || null,
        commissionIncome: data.commissionIncome || null,
        dividendCapitalGainIncome: data.dividendCapitalGainIncome || null,
        businessIncome: data.businessIncome || null,
        otherIncomes: data.otherIncomes || [],
        profitOnSavingsIncome: data.profitSavingParent ? {
          bankDeposits: data.profitSavingParent.bankProfit || [],
          behbood: data.profitSavingParent.behboodProfit || null,
          govtScheme: data.profitSavingParent.govtSchemeProfit || [],
          pensionerBenefits: data.profitSavingParent.pensionerBenefitProfit || null
        } : null,
      },
      deductionsTab: {
        deductionCategories: data.deductionCategories || [],
        bankDeductions: data.bankDeductions || [],
        vehicleDeductions: data.vehicleDeductions || [],
        utilitiesDeductions: data.utilitiesDeductions || [],
        propertyDeductions: data.propertyDeductions || [],
        otherDeductions: data.otherDeductions || null,
      },
      wealthStatementTab: data.wealthStatement || null,
    };
  };
}

module.exports = new WealthReconciliationController(); 