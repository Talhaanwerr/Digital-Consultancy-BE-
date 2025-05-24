const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class SalaryIncomeRepo extends BaseRepository {
  constructor() {
    super(db.SalaryIncome);
    this.model = db.SalaryIncome;
  }

  async createSalaryIncome(data) {
    return this.create(data);
  }

  async findSalaryIncome(customQuery = null) {
    return this.findOne(customQuery);
  }

  async updateSalaryIncome(individualTaxReturnId, data) {
    return this.update(data, {
      where: { individualTaxReturnId }
    });
  }

  async upsertSalaryIncome(data) {
    const { individualTaxReturnId } = data;
    const existing = await this.findSalaryIncome({
      where: { individualTaxReturnId }
    });

    if (existing) {
      return this.updateSalaryIncome(individualTaxReturnId, data);
    } else {
      return this.createSalaryIncome(data);
    }
  }

  async findByTaxReturnId(individualTaxReturnId) {
    return this.findOne({
      where: { individualTaxReturnId }
    });
  }
}

module.exports = new SalaryIncomeRepo(); 