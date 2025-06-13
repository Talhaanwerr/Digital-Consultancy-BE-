const BaseController = require("./BaseController.js");
const IndividualTaxReturnRepo = require("../repos/IndividualTaxReturnRepo.js");
const SalaryIncomeRepo = require("../repos/SalaryIncomeRepo.js");
const PensionIncomeRepo = require("../repos/PensionIncomeRepo.js");
const RentalIncomeRepo = require("../repos/RentalIncomeRepo.js");
const PropertySaleIncomeRepo = require("../repos/PropertySaleIncomeRepo.js");
const AgricultureIncomeRepo = require("../repos/AgricultureIncomeRepo.js");
const PartnershipIncomeRepo = require("../repos/PartnershipIncomeRepo.js");
const FreelancerIncomeRepo = require("../repos/FreelancerIncomeRepo.js");
const ProfessionIncomeRepo = require("../repos/ProfessionIncomeRepo.js");
const CommissionIncomeRepo = require("../repos/CommissionIncomeRepo.js");
const DividendCapitalGainIncomeRepo = require("../repos/DividendCapitalGainIncomeRepo.js");
const BusinessIncomeRepo = require("../repos/BusinessIncomeRepo.js");
const SalaryIncomeValidator = require("../validators/SalaryIncomeValidator.js");
const PensionIncomeValidator = require("../validators/PensionIncomeValidator.js");
const RentalIncomeValidator = require("../validators/RentalIncomeValidator.js");
const PropertySaleIncomeValidator = require("../validators/PropertySaleIncomeValidator.js");
const AgricultureIncomeValidator = require("../validators/AgricultureIncomeValidator.js");
const PartnershipIncomeValidator = require("../validators/PartnershipIncomeValidator.js");
const FreelancerIncomeValidator = require("../validators/FreelancerIncomeValidator.js");
const ProfessionIncomeValidator = require("../validators/ProfessionIncomeValidator.js");
const CommissionIncomeValidator = require("../validators/CommissionIncomeValidator.js");
const DividendCapitalGainIncomeValidator = require("../validators/DividendCapitalGainIncomeValidator.js");
const BusinessIncomeValidator = require("../validators/BusinessIncomeValidator.js");
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

  // Property Sale Income Endpoints
  savePropertySaleIncome = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    
    try {
      const userId = req.user.id;
      const data = { ...req.body };
      
      // Validate input data
      const result = PropertySaleIncomeValidator.validatePropertySaleIncome(data);
      if (!result.status) {
        return this.validationErrorResponse(
          res,
          result?.message || "Invalid data"
        );
      }
      
      const { taxYear, ...propertySaleData } = result.data;
      
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
      
      // Create new property sale income entry
      const propertySaleIncome = await PropertySaleIncomeRepo.createPropertySaleIncome(
        {
          individualTaxReturnId: taxReturn.id,
          ...propertySaleData
        },
        { transaction }
      );
      
      await transaction.commit();
      
      return this.successResponse(
        201,
        res,
        propertySaleIncome,
        "Property sale income saved successfully"
      );
    } catch (error) {
      await transaction.rollback();
      console.error("Error saving property sale income:", error);
      return this.serverErrorResponse(res, "Failed to save property sale income");
    }
  };

  getPropertySaleIncome = async (req, res) => {
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
      
      // Find property sale income entries for this tax return
      const propertySaleIncomes = await PropertySaleIncomeRepo.findByTaxReturnId(taxReturn.id);
      
      return this.successResponse(
        200,
        res,
        propertySaleIncomes || [],
        propertySaleIncomes.length ? "Property sale income entries retrieved successfully" : "No property sale income entries found"
      );
    } catch (error) {
      console.error("Error retrieving property sale income:", error);
      return this.serverErrorResponse(res, "Failed to retrieve property sale income");
    }
  };

  // Agriculture Income Endpoints
  saveAgricultureIncome = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    
    try {
      const userId = req.user.id;
      const data = { ...req.body };
      
      // Validate input data
      const result = AgricultureIncomeValidator.validateAgricultureIncome(data);
      if (!result.status) {
        return this.validationErrorResponse(
          res,
          result?.message || "Invalid data"
        );
      }
      
      const { taxYear, ...agricultureData } = result.data;
      
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
      
      // Upsert agriculture income data
      await AgricultureIncomeRepo.upsertAgricultureIncome(
        {
          individualTaxReturnId: taxReturn.id,
          ...agricultureData
        },
        { transaction }
      );
      
      await transaction.commit();
      
      // Fetch the updated data
      const agricultureIncome = await AgricultureIncomeRepo.findByTaxReturnId(taxReturn.id);
      
      return this.successResponse(
        200,
        res,
        agricultureIncome,
        "Agriculture income saved successfully"
      );
    } catch (error) {
      await transaction.rollback();
      console.error("Error saving agriculture income:", error);
      return this.serverErrorResponse(res, "Failed to save agriculture income");
    }
  };

  getAgricultureIncome = async (req, res) => {
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
      
      // Find agriculture income for this tax return
      const agricultureIncome = await AgricultureIncomeRepo.findByTaxReturnId(taxReturn.id);
      
      return this.successResponse(
        200,
        res,
        agricultureIncome || null,
        agricultureIncome ? "Agriculture income retrieved successfully" : "No agriculture income found"
      );
    } catch (error) {
      console.error("Error retrieving agriculture income:", error);
      return this.serverErrorResponse(res, "Failed to retrieve agriculture income");
    }
  };

  // Partnership Income Endpoints
  savePartnershipIncome = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    
    try {
      const userId = req.user.id;
      const data = { ...req.body };
      
      // Validate input data
      const result = PartnershipIncomeValidator.validatePartnershipIncome(data);
      if (!result.status) {
        return this.validationErrorResponse(
          res,
          result?.message || "Invalid data"
        );
      }
      
      const { taxYear, ...partnershipData } = result.data;
      
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
      
      // Create new partnership income entry
      const partnershipIncome = await PartnershipIncomeRepo.createPartnershipIncome(
        {
          individualTaxReturnId: taxReturn.id,
          ...partnershipData
        },
        { transaction }
      );
      
      await transaction.commit();
      
      return this.successResponse(
        201,
        res,
        partnershipIncome,
        "Partnership income saved successfully"
      );
    } catch (error) {
      await transaction.rollback();
      console.error("Error saving partnership income:", error);
      return this.serverErrorResponse(res, "Failed to save partnership income");
    }
  };

  getPartnershipIncome = async (req, res) => {
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
      
      // Find partnership income entries for this tax return
      const partnershipIncomes = await PartnershipIncomeRepo.findByTaxReturnId(taxReturn.id);
      
      return this.successResponse(
        200,
        res,
        partnershipIncomes || [],
        partnershipIncomes.length ? "Partnership income entries retrieved successfully" : "No partnership income entries found"
      );
    } catch (error) {
      console.error("Error retrieving partnership income:", error);
      return this.serverErrorResponse(res, "Failed to retrieve partnership income");
    }
  };

  // Freelancer Income Endpoints
  saveFreelancerIncome = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    
    try {
      const userId = req.user.id;
      const data = { ...req.body };
      
      // Validate input data
      const result = FreelancerIncomeValidator.validateFreelancerIncome(data);
      if (!result.status) {
        return this.validationErrorResponse(
          res,
          result?.message || "Invalid data"
        );
      }
      
      const { taxYear, ...freelancerData } = result.data;
      
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
      
      // Upsert freelancer income data
      await FreelancerIncomeRepo.upsertFreelancerIncome(
        {
          individualTaxReturnId: taxReturn.id,
          ...freelancerData
        },
        { transaction }
      );
      
      await transaction.commit();
      
      // Fetch the updated data
      const freelancerIncome = await FreelancerIncomeRepo.findByTaxReturnId(taxReturn.id);
      
      return this.successResponse(
        200,
        res,
        freelancerIncome,
        "Freelancer income saved successfully"
      );
    } catch (error) {
      console.error("Error saving freelancer income:", error);
      await transaction.rollback();
      return this.serverErrorResponse(res, "Failed to save freelancer income");
    }
  };

  getFreelancerIncome = async (req, res) => {
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
      
      // Find freelancer income for this tax return
      const freelancerIncome = await FreelancerIncomeRepo.findByTaxReturnId(taxReturn.id);
      
      return this.successResponse(
        200,
        res,
        freelancerIncome || null,
        freelancerIncome ? "Freelancer income retrieved successfully" : "No freelancer income found"
      );
    } catch (error) {
      console.error("Error retrieving freelancer income:", error);
      return this.serverErrorResponse(res, "Failed to retrieve freelancer income");
    }
  };

  // Profession Income Endpoints
  saveProfessionIncome = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    
    try {
      const userId = req.user.id;
      const data = { ...req.body };
      
      // Validate input data
      const result = ProfessionIncomeValidator.validateProfessionIncome(data);
      if (!result.status) {
        return this.validationErrorResponse(
          res,
          result?.message || "Invalid data"
        );
      }
      
      const { taxYear, ...professionData } = result.data;
      
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
      
      // Upsert profession income data
      await ProfessionIncomeRepo.upsertProfessionIncome(
        {
          individualTaxReturnId: taxReturn.id,
          ...professionData
        },
        { transaction }
      );
      
      await transaction.commit();
      
      // Fetch the updated data
      const professionIncome = await ProfessionIncomeRepo.findByTaxReturnId(taxReturn.id);
      
      return this.successResponse(
        200,
        res,
        professionIncome,
        "Profession income saved successfully"
      );
    } catch (error) {
      console.error("Error saving profession income:", error);
      await transaction.rollback();
      return this.serverErrorResponse(res, "Failed to save profession income");
    }
  };

  getProfessionIncome = async (req, res) => {
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
      
      // Find profession income for this tax return
      const professionIncome = await ProfessionIncomeRepo.findByTaxReturnId(taxReturn.id);
      
      return this.successResponse(
        200,
        res,
        professionIncome || null,
        professionIncome ? "Profession income retrieved successfully" : "No profession income found"
      );
    } catch (error) {
      console.error("Error retrieving profession income:", error);
      return this.serverErrorResponse(res, "Failed to retrieve profession income");
    }
  };

  // Commission Income Endpoints
  saveCommissionIncome = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    
    try {
      const userId = req.user.id;
      const data = { ...req.body };
      
      // Validate input data
      const result = CommissionIncomeValidator.validateCommissionIncome(data);
      if (!result.status) {
        return this.validationErrorResponse(
          res,
          result?.message || "Invalid data"
        );
      }
      
      const { taxYear, ...commissionData } = result.data;
      
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
      
      // Upsert commission income data
      await CommissionIncomeRepo.upsertCommissionIncome(
        {
          individualTaxReturnId: taxReturn.id,
          ...commissionData
        },
        { transaction }
      );
      
      await transaction.commit();
      
      // Fetch the updated data
      const commissionIncome = await CommissionIncomeRepo.findByTaxReturnId(taxReturn.id);
      
      return this.successResponse(
        200,
        res,
        commissionIncome,
        "Commission income saved successfully"
      );
    } catch (error) {
      console.error("Error saving commission income:", error);
      await transaction.rollback();
      return this.serverErrorResponse(res, "Failed to save commission income");
    }
  };

  getCommissionIncome = async (req, res) => {
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
      
      // Find commission income for this tax return
      const commissionIncome = await CommissionIncomeRepo.findByTaxReturnId(taxReturn.id);
      
      return this.successResponse(
        200,
        res,
        commissionIncome || null,
        commissionIncome ? "Commission income retrieved successfully" : "No commission income found"
      );
    } catch (error) {
      console.error("Error retrieving commission income:", error);
      return this.serverErrorResponse(res, "Failed to retrieve commission income");
    }
  };

  // Dividend Capital Gain Income Endpoints
  saveDividendCapitalGainIncome = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    
    try {
      const userId = req.user.id;
      const data = { ...req.body };
      
      // Validate input data
      const result = DividendCapitalGainIncomeValidator.validateDividendCapitalGainIncome(data);
      if (!result.status) {
        return this.validationErrorResponse(
          res,
          result?.message || "Invalid data"
        );
      }
      
      const { taxYear, ...dividendCapitalGainData } = result.data;
      
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
      
      // Upsert dividend capital gain income data
      await DividendCapitalGainIncomeRepo.upsertDividendCapitalGainIncome(
        {
          individualTaxReturnId: taxReturn.id,
          ...dividendCapitalGainData
        },
        { transaction }
      );
      
      await transaction.commit();
      
      // Fetch the updated data
      const dividendCapitalGainIncome = await DividendCapitalGainIncomeRepo.findByTaxReturnId(taxReturn.id);
      
      return this.successResponse(
        200,
        res,
        dividendCapitalGainIncome,
        "Dividend and capital gain income saved successfully"
      );
    } catch (error) {
      console.error("Error saving dividend and capital gain income:", error);
      await transaction.rollback();
      return this.serverErrorResponse(res, "Failed to save dividend and capital gain income");
    }
  };

  getDividendCapitalGainIncome = async (req, res) => {
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
      
      // Find dividend capital gain income for this tax return
      const dividendCapitalGainIncome = await DividendCapitalGainIncomeRepo.findByTaxReturnId(taxReturn.id);
      
      return this.successResponse(
        200,
        res,
        dividendCapitalGainIncome || null,
        dividendCapitalGainIncome ? "Dividend and capital gain income retrieved successfully" : "No dividend and capital gain income found"
      );
    } catch (error) {
      console.error("Error retrieving dividend and capital gain income:", error);
      return this.serverErrorResponse(res, "Failed to retrieve dividend and capital gain income");
    }
  };

  // Business Income Endpoints
  saveBusinessIncome = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    
    try {
      const userId = req.user.id;
      const data = { ...req.body };
      
      // Validate input data
      const result = BusinessIncomeValidator.validateBusinessIncome(data);
      if (!result.status) {
        return this.validationErrorResponse(
          res,
          result?.message || "Invalid data"
        );
      }
      
      const { taxYear, ...businessData } = result.data;
      
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
      
      // Upsert business income data
      await BusinessIncomeRepo.upsertBusinessIncome(
        {
          individualTaxReturnId: taxReturn.id,
          ...businessData
        },
        { transaction }
      );
      
      await transaction.commit();
      
      // Fetch the updated data
      const businessIncome = await BusinessIncomeRepo.findByTaxReturnId(taxReturn.id);
      
      return this.successResponse(
        200,
        res,
        businessIncome,
        "Business income saved successfully"
      );
    } catch (error) {
      console.error("Error saving business income:", error);
      await transaction.rollback();
      return this.serverErrorResponse(res, "Failed to save business income");
    }
  };

  getBusinessIncome = async (req, res) => {
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
      
      // Find business income for this tax return
      const businessIncome = await BusinessIncomeRepo.findByTaxReturnId(taxReturn.id);
      
      return this.successResponse(
        200,
        res,
        businessIncome || null,
        businessIncome ? "Business income retrieved successfully" : "No business income found"
      );
    } catch (error) {
      console.error("Error retrieving business income:", error);
      return this.serverErrorResponse(res, "Failed to retrieve business income");
    }
  };
}

module.exports = new IncomeController(); 