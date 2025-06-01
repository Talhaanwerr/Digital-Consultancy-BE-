const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class DeductionVehicleRepo extends BaseRepository {
  constructor() {
    super(db.DeductionVehicle);
    this.model = db.DeductionVehicle;
  }

  async createDeductionVehicle(data) {
    return this.create(data);
  }

  async bulkCreateDeductionVehicle(dataArray, transaction = null) {
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

module.exports = new DeductionVehicleRepo(); 