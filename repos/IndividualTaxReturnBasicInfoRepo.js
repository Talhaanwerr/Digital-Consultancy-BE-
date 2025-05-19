const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class IndividualTaxReturnBasicInfoRepo extends BaseRepository {
  constructor() {
    super(db.IndividualTaxReturnBasicInfo);
    this.model = db.IndividualTaxReturnBasicInfo;
  }

  async createBasicInfo(data) {
    return this.create(data);
  }

  async findBasicInfo(customQuery = null) {
    return this.findOne(customQuery);
  }

  async updateBasicInfo(individualTaxReturnId, data) {
    return this.update(data, {
      where: { individualTaxReturnId }
    });
  }

  async upsertBasicInfo(data) {
    const { individualTaxReturnId } = data;
    const existing = await this.findBasicInfo({
      where: { individualTaxReturnId }
    });

    if (existing) {
      return this.updateBasicInfo(individualTaxReturnId, data);
    } else {
      return this.createBasicInfo(data);
    }
  }
}

module.exports = new IndividualTaxReturnBasicInfoRepo(); 