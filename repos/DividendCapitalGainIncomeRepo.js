const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class DividendCapitalGainIncomeRepo extends BaseRepository {
  constructor() {
    super(db.DividendCapitalGainIncome);
    this.model = db.DividendCapitalGainIncome;
  }

  async createDividendCapitalGainIncome(data) {
    return this.create(data);
  }

  async findDividendCapitalGainIncome(customQuery = null) {
    return this.findOne(customQuery);
  }

  async updateDividendCapitalGainIncome(individualTaxReturnId, data) {
    return this.update(data, {
      where: { individualTaxReturnId }
    });
  }

  async upsertDividendCapitalGainIncome(data) {
    const { individualTaxReturnId } = data;
    const existing = await this.findDividendCapitalGainIncome({
      where: { individualTaxReturnId }
    });

    if (existing) {
      return this.updateDividendCapitalGainIncome(individualTaxReturnId, data);
    } else {
      return this.createDividendCapitalGainIncome(data);
    }
  }

  async findByTaxReturnId(individualTaxReturnId) {
    return this.findOne({
      where: { individualTaxReturnId }
    });
  }
}

module.exports = new DividendCapitalGainIncomeRepo(); 