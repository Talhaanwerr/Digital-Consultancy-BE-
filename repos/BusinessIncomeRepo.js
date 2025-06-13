const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class BusinessIncomeRepo extends BaseRepository {
  constructor() {
    super(db.BusinessIncome);
    this.model = db.BusinessIncome;
  }

  async createBusinessIncome(data) {
    return this.create(data);
  }

  async findBusinessIncome(customQuery = null) {
    return this.findOne(customQuery);
  }

  async updateBusinessIncome(individualTaxReturnId, data) {
    return this.update(data, {
      where: { individualTaxReturnId }
    });
  }

  async upsertBusinessIncome(data) {
    const { individualTaxReturnId } = data;
    const existing = await this.findBusinessIncome({
      where: { individualTaxReturnId }
    });

    if (existing) {
      return this.updateBusinessIncome(individualTaxReturnId, data);
    } else {
      return this.createBusinessIncome(data);
    }
  }

  async findByTaxReturnId(individualTaxReturnId) {
    return this.findOne({
      where: { individualTaxReturnId }
    });
  }
}

module.exports = new BusinessIncomeRepo(); 