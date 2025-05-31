const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class AgricultureIncomeRepo extends BaseRepository {
  constructor() {
    super(db.AgricultureIncome);
    this.model = db.AgricultureIncome;
  }

  async createAgricultureIncome(data) {
    return this.create(data);
  }

  async findAgricultureIncome(customQuery = null) {
    return this.findOne(customQuery);
  }

  async updateAgricultureIncome(individualTaxReturnId, data) {
    return this.update(data, {
      where: { individualTaxReturnId }
    });
  }

  async upsertAgricultureIncome(data) {
    const { individualTaxReturnId } = data;
    const existing = await this.findAgricultureIncome({
      where: { individualTaxReturnId }
    });

    if (existing) {
      return this.updateAgricultureIncome(individualTaxReturnId, data);
    } else {
      return this.createAgricultureIncome(data);
    }
  }

  async findByTaxReturnId(individualTaxReturnId) {
    return this.findOne({
      where: { individualTaxReturnId }
    });
  }
}

module.exports = new AgricultureIncomeRepo(); 