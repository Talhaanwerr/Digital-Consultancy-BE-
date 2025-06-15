const BaseRepo = require('./BaseRepo.js');
const db = require('../models/index.js');

class ProfitSavingBehboodRepo extends BaseRepo {
  constructor() {
    super(db.ProfitSavingBehbood);
  }

  async findByParentId(parentId, options = {}) {
    return await this.findOne({
      where: { parentId },
      ...options,
    });
  }

  async upsert(data, transaction) {
    // First try to find
    const existing = await this.findOne({
      where: { parentId: data.parentId },
      transaction,
    });
    
    // If found, update it
    if (existing) {
      await this.update(data, {
        where: { parentId: data.parentId },
        transaction,
      });
      return [await this.findOne({ where: { parentId: data.parentId }, transaction }), false];
    }
    
    // If not found, create it
    const created = await this.create(data, { transaction });
    return [created, true];
  }
}

module.exports = new ProfitSavingBehboodRepo(); 