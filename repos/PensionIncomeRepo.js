const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class PensionIncomeRepo extends BaseRepository {
  constructor() {
    super(db.PensionIncome);
    this.model = db.PensionIncome;
  }

  async createPensionIncome(data) {
    return this.create(data);
  }

  async findPensionIncome(customQuery = null) {
    return this.findOne(customQuery);
  }

  async updatePensionIncome(individualTaxReturnId, data) {
    return this.update(data, {
      where: { individualTaxReturnId }
    });
  }

  async upsertPensionIncome(data) {
    const { individualTaxReturnId } = data;
    const existing = await this.findPensionIncome({
      where: { individualTaxReturnId }
    });

    if (existing) {
      return this.updatePensionIncome(individualTaxReturnId, data);
    } else {
      return this.createPensionIncome(data);
    }
  }

  async findByTaxReturnId(individualTaxReturnId) {
    return this.findOne({
      where: { individualTaxReturnId }
    });
  }
}

module.exports = new PensionIncomeRepo(); 