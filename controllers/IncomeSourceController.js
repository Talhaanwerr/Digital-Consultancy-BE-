const BaseController = require("./BaseController.js");
const IncomeSourceTypeRepo = require("../repos/IncomeSourceTypeRepo.js");
const IndividualTaxReturnRepo = require("../repos/IndividualTaxReturnRepo.js");
const db = require("../models/index.js");

class IncomeSourceController extends BaseController {
  constructor() {
    super();
  }

  getAllIncomeSources = async (req, res) => {
    try {
      const incomeSources =
        await IncomeSourceTypeRepo.findAllIncomeSourceTypes();

      return this.successResponse(
        200,
        res,
        { incomeSources },
        "Income source types retrieved successfully"
      );
    } catch (error) {
      console.error("Error fetching income source types:", error);
      return this.serverErrorResponse(
        res,
        "Failed to retrieve income source types"
      );
    }
  };

  updateTaxReturnIncomeSources = async (req, res) => {
    const transaction = await db.sequelize.transaction();

    try {
      const userId = req.user.id;
      const { taxYear, incomeSourceTypeIds } = req.body;

      if (
        !taxYear ||
        !incomeSourceTypeIds ||
        !Array.isArray(incomeSourceTypeIds)
      ) {
        return this.validationErrorResponse(
          res,
          "Tax year and income source type IDs array are required"
        );
      }

      // First, find or create the tax return for this user and tax year
      let taxReturn = await IndividualTaxReturnRepo.findTaxReturn({
        where: { userId, taxYear },
        transaction,
      });

      if (!taxReturn) {
        taxReturn = await IndividualTaxReturnRepo.createTaxReturn(
          {
            filingFor: "Self", // Default value
            taxYear,
            userId,
            applicationStatus: "draft",
            status: "incomplete",
          },
          { transaction }
        );
      }

      // Remove all existing income source associations for this tax return
      await db.sequelize.query(
        "DELETE FROM `IndividualTaxReturn_IncomeSources` WHERE `individualTaxReturnId` = ?",
        {
          replacements: [taxReturn.id],
          type: db.sequelize.QueryTypes.DELETE,
          transaction,
        }
      );

      // Create new associations for the provided income source type IDs
      if (incomeSourceTypeIds.length > 0) {
        const incomeSourcesData = incomeSourceTypeIds.map((typeId) => ({
          individualTaxReturnId: taxReturn.id,
          incomeSourceTypeId: typeId,
          createdAt: new Date(),
          updatedAt: new Date(),
        }));

        await db.sequelize.queryInterface.bulkInsert(
          "IndividualTaxReturn_IncomeSources",
          incomeSourcesData,
          { transaction }
        );
      }

      await transaction.commit();

      // Fetch the updated tax return with income sources
      const updatedTaxReturn = await IndividualTaxReturnRepo.findTaxReturn({
        where: { id: taxReturn.id },
        include: [
          {
            model: db.IncomeSourceType,
            as: "incomeSources",
            through: { attributes: [] }, // Don't include junction table fields
          },
        ],
      });

      return this.successResponse(
        200,
        res,
        updatedTaxReturn,
        "Income sources updated successfully"
      );
    } catch (error) {
      await transaction.rollback();
      console.error("Error updating income sources:", error);
      return this.serverErrorResponse(res, "Failed to update income sources");
    }
  };
}

module.exports = new IncomeSourceController();
