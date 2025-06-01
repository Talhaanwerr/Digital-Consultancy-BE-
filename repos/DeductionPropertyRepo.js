const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class DeductionPropertyRepo extends BaseRepository {
  constructor() {
    super(db.DeductionProperty);
    this.model = db.DeductionProperty;
  }

  async createDeductionProperty(data) {
    return this.create(data);
  }

  async bulkCreateDeductionProperty(dataArray, transaction = null) {
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

module.exports = new DeductionPropertyRepo(); 