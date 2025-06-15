const BaseRepo = require('./BaseRepo.js');
const db = require('../models/index.js');

class ProfitSavingParentRepo extends BaseRepo {
  constructor() {
    super(db.ProfitSavingParent);
  }

  async findByIndividualTaxReturnId(individualTaxReturnId, options = {}) {
    return await this.findOne({
      where: { individualTaxReturnId },
      ...options,
    });
  }

  async findOrCreateByIndividualTaxReturnId(individualTaxReturnId, transaction) {
    // First try to find
    const parent = await this.findOne({
      where: { individualTaxReturnId },
      transaction,
    });
    
    // If found, return it
    if (parent) {
      return { parent, created: false };
    }
    
    // If not found, create it
    const newParent = await this.create(
      { individualTaxReturnId },
      { transaction }
    );
    
    return { parent: newParent, created: true };
  }
}

module.exports = new ProfitSavingParentRepo(); 