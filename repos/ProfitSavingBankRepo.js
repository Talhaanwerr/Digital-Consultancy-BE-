const BaseRepo = require('./BaseRepo.js');
const db = require('../models/index.js');

class ProfitSavingBankRepo extends BaseRepo {
  constructor() {
    super(db.ProfitSavingBank);
  }

  async findByParentId(parentId, options = {}) {
    return await this.findAll({
      where: { parentId },
      ...options,
    });
  }

  async bulkCreateOrUpdate(parentId, bankData, transaction) {
    // First, delete all existing records for this parent
    await this.delete({
      where: { parentId },
      transaction,
    });

    // Then create new records
    if (bankData && bankData.length > 0) {
      const dataToInsert = bankData.map(item => ({
        parentId,
        ...item,
      }));
      return await this.bulkCreate(dataToInsert, { transaction });
    }
    
    return [];
  }
}

module.exports = new ProfitSavingBankRepo(); 