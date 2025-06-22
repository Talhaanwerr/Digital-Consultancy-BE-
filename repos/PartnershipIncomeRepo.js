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

  async bulkCreatePartnershipIncome(data, options = {}) {
    return this.bulkCreate(data, options);
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

  async deleteByTaxReturnId(individualTaxReturnId, options = {}) {
    try {
      return await this.delete({
        where: { individualTaxReturnId },
        ...options
      });
    } catch (error) {
      console.error("Error deleting partnership income entries:", error);
      throw error;
    }
  }
}

module.exports = new PartnershipIncomeRepo(); 