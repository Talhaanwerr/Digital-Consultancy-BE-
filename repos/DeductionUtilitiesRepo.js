const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class DeductionUtilitiesRepo extends BaseRepository {
  constructor() {
    super(db.DeductionUtilities);
    this.model = db.DeductionUtilities;
  }

  async createDeductionUtilities(data) {
    return this.create(data);
  }

  async bulkCreateDeductionUtilities(dataArray, transaction = null) {
    return this.model.bulkCreate(dataArray, { transaction });
  }

  async findByTaxReturnId(individualTaxReturnId) {
    return this.findMany({
      where: { individualTaxReturnId }
    });
  }

  async deleteByTaxReturnId(individualTaxReturnId, transaction = null) {
    return this.model.destroy({
      where: { individualTaxReturnId },
      transaction
    });
  }
}

module.exports = new DeductionUtilitiesRepo(); 