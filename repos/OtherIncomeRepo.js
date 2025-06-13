const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class OtherIncomeRepo extends BaseRepository {
  constructor() {
    super(db.OtherIncome);
    this.model = db.OtherIncome;
  }

  async createOtherIncome(data) {
    return this.create(data);
  }

  async bulkCreateOtherIncome(data, options = {}) {
    return this.model.bulkCreate(data, options);
  }

  async findOtherIncome(customQuery = null) {
    return this.findOne(customQuery);
  }

  async findAllByTaxReturnId(individualTaxReturnId) {
    return this.findAll({
      where: { individualTaxReturnId },
      order: [['createdAt', 'ASC']]
    });
  }

  async deleteByTaxReturnId(individualTaxReturnId, options = {}) {
    return this.delete({
      where: { individualTaxReturnId }
    }, options);
  }
}

module.exports = new OtherIncomeRepo(); 