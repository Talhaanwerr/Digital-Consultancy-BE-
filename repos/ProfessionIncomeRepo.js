const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class ProfessionIncomeRepo extends BaseRepository {
  constructor() {
    super(db.ProfessionIncome);
    this.model = db.ProfessionIncome;
  }

  async createProfessionIncome(data) {
    return this.create(data);
  }

  async findProfessionIncome(customQuery = null) {
    return this.findOne(customQuery);
  }

  async updateProfessionIncome(individualTaxReturnId, data) {
    return this.update(data, {
      where: { individualTaxReturnId }
    });
  }

  async upsertProfessionIncome(data) {
    const { individualTaxReturnId } = data;
    const existing = await this.findProfessionIncome({
      where: { individualTaxReturnId }
    });

    if (existing) {
      return this.updateProfessionIncome(individualTaxReturnId, data);
    } else {
      return this.createProfessionIncome(data);
    }
  }

  async findByTaxReturnId(individualTaxReturnId) {
    return this.findOne({
      where: { individualTaxReturnId }
    });
  }
}

module.exports = new ProfessionIncomeRepo(); 