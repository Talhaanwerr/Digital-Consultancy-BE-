const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class IndividualTaxReturnFbrInfoRepo extends BaseRepository {
  constructor() {
    super(db.IndividualTaxReturnFbrInfo);
    this.model = db.IndividualTaxReturnFbrInfo;
  }

  async createFbrInfo(data) {
    return this.create(data);
  }

  async findFbrInfo(customQuery = null) {
    return this.findOne(customQuery);
  }

  async updateFbrInfo(individualTaxReturnId, data) {
    return this.update(data, {
      where: { individualTaxReturnId }
    });
  }

  async upsertFbrInfo(data) {
    const { individualTaxReturnId } = data;
    const existing = await this.findFbrInfo({
      where: { individualTaxReturnId }
    });

    if (existing) {
      return this.updateFbrInfo(individualTaxReturnId, data);
    } else {
      return this.createFbrInfo(data);
    }
  }
}

module.exports = new IndividualTaxReturnFbrInfoRepo(); 