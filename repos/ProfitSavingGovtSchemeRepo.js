const BaseRepo = require('./BaseRepo.js');
const db = require('../models/index.js');

class ProfitSavingGovtSchemeRepo extends BaseRepo {
  constructor() {
    super(db.ProfitSavingGovtScheme);
  }

  async findByParentId(parentId, options = {}) {
    return await this.findAll({
      where: { parentId },
      ...options,
    });
  }

  async bulkCreateOrUpdate(parentId, schemeData, transaction) {
    // First, delete all existing records for this parent
    await this.delete({
      where: { parentId },
      transaction,
    });

    // Then create new records
    if (schemeData && schemeData.length > 0) {
      const dataToInsert = schemeData.map(item => ({
        parentId,
        ...item,
      }));
      return await this.bulkCreate(dataToInsert, { transaction });
    }
    
    return [];
  }
}

module.exports = new ProfitSavingGovtSchemeRepo(); 