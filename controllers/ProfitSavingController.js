const BaseController = require('./BaseController.js');
const IndividualTaxReturnRepo = require('../repos/IndividualTaxReturnRepo.js');
const ProfitSavingParentRepo = require('../repos/ProfitSavingParentRepo.js');
const ProfitSavingBankRepo = require('../repos/ProfitSavingBankRepo.js');
const ProfitSavingBehboodRepo = require('../repos/ProfitSavingBehboodRepo.js');
const ProfitSavingGovtSchemeRepo = require('../repos/ProfitSavingGovtSchemeRepo.js');
const ProfitSavingPensionerBenefitRepo = require('../repos/ProfitSavingPensionerBenefitRepo.js');
const ProfitSavingBankValidator = require('../validators/ProfitSavingBankValidator.js');
const ProfitSavingBehboodValidator = require('../validators/ProfitSavingBehboodValidator.js');
const ProfitSavingGovtSchemeValidator = require('../validators/ProfitSavingGovtSchemeValidator.js');
const ProfitSavingPensionerBenefitValidator = require('../validators/ProfitSavingPensionerBenefitValidator.js');
const db = require('../models/index.js');

class ProfitSavingController extends BaseController {
  constructor() {
    super();
  }

  // Helper function to find or create tax return and parent record
  async _getOrCreateParent(userId, taxYear, transaction) {
    // Find tax return for the user and tax year
    let taxReturn = await IndividualTaxReturnRepo.findTaxReturn({
      where: { userId, taxYear },
      transaction,
    });

    if (!taxReturn) {
      // Create tax return if it doesn't exist
      taxReturn = await IndividualTaxReturnRepo.createTaxReturn(
        { userId, taxYear },
        { transaction }
      );
    }

    // Find or create profit saving parent record
    const { parent } = await ProfitSavingParentRepo.findOrCreateByIndividualTaxReturnId(
      taxReturn.id,
      transaction
    );

    return parent;
  }

  // Bank Profit APIs
  saveBankProfit = async (req, res) => {
    const transaction = await db.sequelize.transaction();

    try {
      const userId = req.user.id;
      const { taxYear, data } = req.body;

      if (!taxYear) {
        return this.validationErrorResponse(res, 'Tax year is required');
      }

      // Validate bank data
      const validationResult = ProfitSavingBankValidator.validateBankData(data);
      if (!validationResult.status) {
        return this.validationErrorResponse(res, validationResult.message);
      }

      // Get or create parent record
      const parent = await this._getOrCreateParent(userId, taxYear, transaction);

      // Save bank profit data
      await ProfitSavingBankRepo.bulkCreateOrUpdate(
        parent.id,
        validationResult.data,
        transaction
      );

      await transaction.commit();

      // Fetch the saved data
      const bankProfit = await ProfitSavingBankRepo.findByParentId(parent.id);

      return this.successResponse(
        200,
        res,
        { bankProfit },
        'Bank profit data saved successfully'
      );
    } catch (error) {
        console.error('Error saving bank profit data:', error);
        await transaction.rollback();
      return this.serverErrorResponse(res, 'Failed to save bank profit data');
    }
  };

  getBankProfit = async (req, res) => {
    try {
      const userId = req.user.id;
      const { year } = req.params;

      if (!year) {
        return this.validationErrorResponse(res, 'Tax year is required');
      }

      // Find tax return for the user and tax year
      const taxReturn = await IndividualTaxReturnRepo.findTaxReturn({
        where: { userId, taxYear: year },
      });

      if (!taxReturn) {
        return this.successResponse(200, res, { bankProfit: [] }, 'No data found');
      }

      // Find profit saving parent record
      const parent = await ProfitSavingParentRepo.findByIndividualTaxReturnId(
        taxReturn.id
      );

      if (!parent) {
        return this.successResponse(200, res, { bankProfit: [] }, 'No data found');
      }

      // Fetch bank profit data
      const bankProfit = await ProfitSavingBankRepo.findByParentId(parent.id);

      return this.successResponse(
        200,
        res,
        { bankProfit },
        'Bank profit data retrieved successfully'
      );
    } catch (error) {
      console.error('Error retrieving bank profit data:', error);
      return this.serverErrorResponse(res, 'Failed to retrieve bank profit data');
    }
  };

  // Behbood Profit APIs
  saveBehboodProfit = async (req, res) => {
    const transaction = await db.sequelize.transaction();

    try {
      const userId = req.user.id;
      const { taxYear, profitPKR, investmentPKR } = req.body;

      if (!taxYear) {
        return this.validationErrorResponse(res, 'Tax year is required');
      }

      // Validate behbood data
      const validationResult = ProfitSavingBehboodValidator.validateBehboodData({
        profitPKR,
        investmentPKR,
      });
      if (!validationResult.status) {
        return this.validationErrorResponse(res, validationResult.message);
      }

      // Get or create parent record
      const parent = await this._getOrCreateParent(userId, taxYear, transaction);

      // Save behbood profit data
      await ProfitSavingBehboodRepo.upsert(
        {
          parentId: parent.id,
          ...validationResult.data,
        },
        transaction
      );

      await transaction.commit();

      // Fetch the saved data
      const behboodProfit = await ProfitSavingBehboodRepo.findByParentId(parent.id);

      return this.successResponse(
        200,
        res,
        { behboodProfit },
        'Behbood profit data saved successfully'
      );
    } catch (error) {
        console.error('Error saving behbood profit data:', error);
        await transaction.rollback();
      return this.serverErrorResponse(res, 'Failed to save behbood profit data');
    }
  };

  getBehboodProfit = async (req, res) => {
    try {
      const userId = req.user.id;
      const { year } = req.params;

      if (!year) {
        return this.validationErrorResponse(res, 'Tax year is required');
      }

      // Find tax return for the user and tax year
      const taxReturn = await IndividualTaxReturnRepo.findTaxReturn({
        where: { userId, taxYear: year },
      });

      if (!taxReturn) {
        return this.successResponse(200, res, { behboodProfit: null }, 'No data found');
      }

      // Find profit saving parent record
      const parent = await ProfitSavingParentRepo.findByIndividualTaxReturnId(
        taxReturn.id
      );

      if (!parent) {
        return this.successResponse(200, res, { behboodProfit: null }, 'No data found');
      }

      // Fetch behbood profit data
      const behboodProfit = await ProfitSavingBehboodRepo.findByParentId(parent.id);

      return this.successResponse(
        200,
        res,
        { behboodProfit },
        'Behbood profit data retrieved successfully'
      );
    } catch (error) {
      console.error('Error retrieving behbood profit data:', error);
      return this.serverErrorResponse(res, 'Failed to retrieve behbood profit data');
    }
  };

  // Government Scheme Profit APIs
  saveGovtSchemeProfit = async (req, res) => {
    const transaction = await db.sequelize.transaction();

    try {
      const userId = req.user.id;
      const { taxYear, data } = req.body;

      if (!taxYear) {
        return this.validationErrorResponse(res, 'Tax year is required');
      }

      // Validate government scheme data
      const validationResult = ProfitSavingGovtSchemeValidator.validateGovtSchemeData(data);
      if (!validationResult.status) {
        return this.validationErrorResponse(res, validationResult.message);
      }

      // Get or create parent record
      const parent = await this._getOrCreateParent(userId, taxYear, transaction);

      // Save government scheme profit data
      await ProfitSavingGovtSchemeRepo.bulkCreateOrUpdate(
        parent.id,
        validationResult.data,
        transaction
      );

      await transaction.commit();

      // Fetch the saved data
      const govtSchemeProfit = await ProfitSavingGovtSchemeRepo.findByParentId(parent.id);

      return this.successResponse(
        200,
        res,
        { govtSchemeProfit },
        'Government scheme profit data saved successfully'
      );
    } catch (error) {
        console.error('Error saving government scheme profit data:', error);
        await transaction.rollback();
      return this.serverErrorResponse(res, 'Failed to save government scheme profit data');
    }
  };

  getGovtSchemeProfit = async (req, res) => {
    try {
      const userId = req.user.id;
      const { year } = req.params;

      if (!year) {
        return this.validationErrorResponse(res, 'Tax year is required');
      }

      // Find tax return for the user and tax year
      const taxReturn = await IndividualTaxReturnRepo.findTaxReturn({
        where: { userId, taxYear: year },
      });

      if (!taxReturn) {
        return this.successResponse(200, res, { govtSchemeProfit: [] }, 'No data found');
      }

      // Find profit saving parent record
      const parent = await ProfitSavingParentRepo.findByIndividualTaxReturnId(
        taxReturn.id
      );

      if (!parent) {
        return this.successResponse(200, res, { govtSchemeProfit: [] }, 'No data found');
      }

      // Fetch government scheme profit data
      const govtSchemeProfit = await ProfitSavingGovtSchemeRepo.findByParentId(parent.id);

      return this.successResponse(
        200,
        res,
        { govtSchemeProfit },
        'Government scheme profit data retrieved successfully'
      );
    } catch (error) {
      console.error('Error retrieving government scheme profit data:', error);
      return this.serverErrorResponse(res, 'Failed to retrieve government scheme profit data');
    }
  };

  // Pensioner Benefit Profit APIs
  savePensionerBenefitProfit = async (req, res) => {
    const transaction = await db.sequelize.transaction();

    try {
      const userId = req.user.id;
      const { taxYear, profitPKR, investmentPKR } = req.body;

      if (!taxYear) {
        return this.validationErrorResponse(res, 'Tax year is required');
      }

      // Validate pensioner benefit data
      const validationResult = ProfitSavingPensionerBenefitValidator.validatePensionerData({
        profitPKR,
        investmentPKR,
      });
      if (!validationResult.status) {
        return this.validationErrorResponse(res, validationResult.message);
      }

      // Get or create parent record
      const parent = await this._getOrCreateParent(userId, taxYear, transaction);

      // Save pensioner benefit profit data
      await ProfitSavingPensionerBenefitRepo.upsert(
        {
          parentId: parent.id,
          ...validationResult.data,
        },
        transaction
      );

      await transaction.commit();

      // Fetch the saved data
      const pensionerBenefitProfit = await ProfitSavingPensionerBenefitRepo.findByParentId(parent.id);

      return this.successResponse(
        200,
        res,
        { pensionerBenefitProfit },
        'Pensioner benefit profit data saved successfully'
      );
    } catch (error) {
        console.error('Error saving pensioner benefit profit data:', error);
        await transaction.rollback();
      return this.serverErrorResponse(res, 'Failed to save pensioner benefit profit data');
    }
  };

  getPensionerBenefitProfit = async (req, res) => {
    try {
      const userId = req.user.id;
      const { year } = req.params;

      if (!year) {
        return this.validationErrorResponse(res, 'Tax year is required');
      }

      // Find tax return for the user and tax year
      const taxReturn = await IndividualTaxReturnRepo.findTaxReturn({
        where: { userId, taxYear: year },
      });

      if (!taxReturn) {
        return this.successResponse(200, res, { pensionerBenefitProfit: null }, 'No data found');
      }

      // Find profit saving parent record
      const parent = await ProfitSavingParentRepo.findByIndividualTaxReturnId(
        taxReturn.id
      );

      if (!parent) {
        return this.successResponse(200, res, { pensionerBenefitProfit: null }, 'No data found');
      }

      // Fetch pensioner benefit profit data
      const pensionerBenefitProfit = await ProfitSavingPensionerBenefitRepo.findByParentId(parent.id);

      return this.successResponse(
        200,
        res,
        { pensionerBenefitProfit },
        'Pensioner benefit profit data retrieved successfully'
      );
    } catch (error) {
      console.error('Error retrieving pensioner benefit profit data:', error);
      return this.serverErrorResponse(res, 'Failed to retrieve pensioner benefit profit data');
    }
  };
}

module.exports = new ProfitSavingController(); 