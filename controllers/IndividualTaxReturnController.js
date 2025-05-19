const BaseController = require("./BaseController.js");
const IndividualTaxReturnRepo = require("../repos/IndividualTaxReturnRepo.js");
const IndividualTaxReturnBasicInfoRepo = require("../repos/IndividualTaxReturnBasicInfoRepo.js");
const IndividualTaxReturnPersonalInfoRepo = require("../repos/IndividualTaxReturnPersonalInfoRepo.js");
const IndividualTaxReturnFbrInfoRepo = require("../repos/IndividualTaxReturnFbrInfoRepo.js");
const IndividualTaxReturnValidator = require("../validators/IndividualTaxReturnValidator.js");
const db = require("../models/index.js");
const { rest } = require("lodash");

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

      const { basicInfo, personalInfo, fbrInfo, incomeSources, ...rest } =
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
}

module.exports = new IndividualTaxReturnController();
