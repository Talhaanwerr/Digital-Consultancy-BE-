const db = require('../models');
const { ENTITY_TYPES } = require('../constants/constants');

class MyRecordsService {
  /**
   * Fetches all records for a specific user across all modules
   * @param {number} userId - The ID of the user
   * @returns {Promise<Object>} - Object containing arrays of records for each module
   */
  async getAllRecords(userId) {
    try {
      // Define queries for each model with the userId filter
      const queries = [
        // Individual Tax Return
        db.IndividualTaxReturn.findAll({ 
          where: { userId },
          include: [
            { model: db.IndividualTaxReturnBasicInfo, as: 'basicInfo' },
            { model: db.IndividualTaxReturnPersonalInfo, as: 'personalInfo' },
            { model: db.IndividualTaxReturnFbrInfo, as: 'fbrInfo' }
          ]
        }),
        
        // Sales Tax
        db.SalesTax.findAll({ where: { userId } }),
        
        // NTN Registration
        db.NtnRegistration.findAll({ where: { userId } }),
        
        // GST/PST Registration
        db.GstPstRegistration.findAll({ where: { userId } }),
        
        // Sole Proprietorship
        db.SoleProprietorRegistration.findAll({ where: { userId } }),
        
        // Business Addition to NTN
        db.BusinessAdditionToNtn.findAll({ where: { userId } }),
        
        // Business Deletion from NTN
        db.BusinessDeletionFromNtn.findAll({ where: { userId } }),
        
        // LLP Registration
        db.LlpRegistration.findAll({ 
          where: { userId },
          include: [{ model: db.LlpPartner, as: 'partners' }]
        }),
        
        // AOP Registration
        db.AopRegistration.findAll({ 
          where: { userId },
          include: [{ model: db.AopPartner, as: 'partners' }]
        }),
        
        // Private Limited Registration
        db.PvtLtdRegistration.findAll({ 
          where: { userId },
          include: [
            { model: db.PvtLtdDirector, as: 'directors' },
            { model: db.PvtLtdNominee, as: 'nominee' },
            { model: db.PvtLtdCeo, as: 'ceo' }
          ]
        })
      ];

      // Execute all queries in parallel
      const [
        individualTaxReturns,
        salesTaxFilings,
        ntnRegistrations,
        gstPstRegistrations,
        businessSoleProps,
        businessAdditionsToNtn,
        businessDeletionsFromNtn,
        llpRegistrations,
        aopRegistrations,
        pvtLtdRegistrations
      ] = await Promise.all(queries);

      // Return consolidated results
      return {
        individualTaxReturns: individualTaxReturns || [],
        salesTaxFilings: salesTaxFilings || [],
        ntnRegistrations: ntnRegistrations || [],
        gstPstRegistrations: gstPstRegistrations || [],
        businessSoleProps: businessSoleProps || [],
        businessAdditionsToNtn: businessAdditionsToNtn || [],
        businessDeletionsFromNtn: businessDeletionsFromNtn || [],
        llpRegistrations: llpRegistrations || [],
        aopRegistrations: aopRegistrations || [],
        pvtLtdRegistrations: pvtLtdRegistrations || []
      };
    } catch (error) {
      console.error('Error in MyRecordsService.getAllRecords:', error);
      throw error;
    }
  }
}

module.exports = new MyRecordsService(); 