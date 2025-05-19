const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class IndividualTaxReturnPersonalInfoRepo extends BaseRepository {
  constructor() {
    super(db.IndividualTaxReturnPersonalInfo);
    this.model = db.IndividualTaxReturnPersonalInfo;
  }

  async createPersonalInfo(data) {
    return this.create(data);
  }

  async findPersonalInfo(customQuery = null) {
    return this.findOne(customQuery);
  }

  async updatePersonalInfo(individualTaxReturnId, data) {
    return this.update(data, {
      where: { individualTaxReturnId }
    });
  }

  async upsertPersonalInfo(data) {
    const { individualTaxReturnId } = data;
    const existing = await this.findPersonalInfo({
      where: { individualTaxReturnId }
    });

    if (existing) {
      return this.updatePersonalInfo(individualTaxReturnId, data);
    } else {
      return this.createPersonalInfo(data);
    }
  }
}

module.exports = new IndividualTaxReturnPersonalInfoRepo(); 