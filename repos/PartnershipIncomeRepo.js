const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class PartnershipIncomeRepo extends BaseRepository {
  constructor() {
    super(db.PartnershipIncome);
    this.model = db.PartnershipIncome;
  }

  async createPartnershipIncome(data) {
    return this.create(data);
  }

  async findPartnershipIncome(customQuery = null) {
    return this.findOne(customQuery);
  }

  async findAll(customQuery = null) {
    return this.findMany(customQuery);
  }

  async updatePartnershipIncome(id, data) {
    return this.update(data, {
      where: { id }
    });
  }

  async findByTaxReturnId(individualTaxReturnId) {
    return this.findMany({
      where: { individualTaxReturnId }
    });
  }
}

module.exports = new PartnershipIncomeRepo(); 