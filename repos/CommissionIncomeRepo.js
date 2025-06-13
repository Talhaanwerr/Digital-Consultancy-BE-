const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class CommissionIncomeRepo extends BaseRepository {
  constructor() {
    super(db.CommissionIncome);
    this.model = db.CommissionIncome;
  }

  async createCommissionIncome(data) {
    return this.create(data);
  }

  async findCommissionIncome(customQuery = null) {
    return this.findOne(customQuery);
  }

  async updateCommissionIncome(individualTaxReturnId, data) {
    return this.update(data, {
      where: { individualTaxReturnId }
    });
  }

  async upsertCommissionIncome(data) {
    const { individualTaxReturnId } = data;
    const existing = await this.findCommissionIncome({
      where: { individualTaxReturnId }
    });

    if (existing) {
      return this.updateCommissionIncome(individualTaxReturnId, data);
    } else {
      return this.createCommissionIncome(data);
    }
  }

  async findByTaxReturnId(individualTaxReturnId) {
    return this.findOne({
      where: { individualTaxReturnId }
    });
  }
}

module.exports = new CommissionIncomeRepo(); 