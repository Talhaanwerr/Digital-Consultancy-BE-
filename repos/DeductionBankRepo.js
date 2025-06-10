const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class DeductionBankRepo extends BaseRepository {
  constructor() {
    super(db.DeductionBank);
    this.model = db.DeductionBank;
  }

  async createDeductionBank(data) {
    return this.create(data);
  }

  async bulkCreateDeductionBank(dataArray, transaction = null) {
    return this.model.bulkCreate(dataArray, { transaction });
  }

  async findByTaxReturnId(individualTaxReturnId) {
    return this.findAll({
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

module.exports = new DeductionBankRepo(); 