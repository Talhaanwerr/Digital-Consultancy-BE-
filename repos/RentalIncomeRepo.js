const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class RentalIncomeRepo extends BaseRepository {
  constructor() {
    super(db.RentalIncome);
    this.model = db.RentalIncome;
  }

  async createRentalIncome(data) {
    return this.create(data);
  }

  async findRentalIncome(customQuery = null) {
    return this.findOne(customQuery);
  }

  async updateRentalIncome(individualTaxReturnId, data) {
    return this.update(data, {
      where: { individualTaxReturnId }
    });
  }

  async upsertRentalIncome(data) {
    const { individualTaxReturnId } = data;
    const existing = await this.findRentalIncome({
      where: { individualTaxReturnId }
    });

    if (existing) {
      return this.updateRentalIncome(individualTaxReturnId, data);
    } else {
      return this.createRentalIncome(data);
    }
  }

  async findByTaxReturnId(individualTaxReturnId) {
    return this.findOne({
      where: { individualTaxReturnId }
    });
  }
}

module.exports = new RentalIncomeRepo(); 