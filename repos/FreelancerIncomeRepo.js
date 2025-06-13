const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class FreelancerIncomeRepo extends BaseRepository {
  constructor() {
    super(db.FreelancerIncome);
    this.model = db.FreelancerIncome;
  }

  async createFreelancerIncome(data) {
    return this.create(data);
  }

  async findFreelancerIncome(customQuery = null) {
    return this.findOne(customQuery);
  }

  async updateFreelancerIncome(individualTaxReturnId, data) {
    return this.update(data, {
      where: { individualTaxReturnId }
    });
  }

  async upsertFreelancerIncome(data) {
    const { individualTaxReturnId } = data;
    const existing = await this.findFreelancerIncome({
      where: { individualTaxReturnId }
    });

    if (existing) {
      return this.updateFreelancerIncome(individualTaxReturnId, data);
    } else {
      return this.createFreelancerIncome(data);
    }
  }

  async findByTaxReturnId(individualTaxReturnId) {
    return this.findOne({
      where: { individualTaxReturnId }
    });
  }
}

module.exports = new FreelancerIncomeRepo(); 