const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class DeductionOthersRepo extends BaseRepository {
  constructor() {
    super(db.DeductionOthers);
    this.model = db.DeductionOthers;
  }

  async createDeductionOthers(data) {
    return this.create(data);
  }

  async updateDeductionOthers(individualTaxReturnId, data) {
    return this.update(data, {
      where: { individualTaxReturnId }
    });
  }

  async upsertDeductionOthers(data, transaction = null) {
    const { individualTaxReturnId } = data;
    const existing = await this.findOne({
      where: { individualTaxReturnId }
    });

    if (existing) {
      return this.updateDeductionOthers(individualTaxReturnId, data, transaction);
    } else {
      return this.createDeductionOthers(data, transaction);
    }
  }

  async findByTaxReturnId(individualTaxReturnId) {
    return this.findOne({
      where: { individualTaxReturnId }
    });
  }
}

module.exports = new DeductionOthersRepo(); 