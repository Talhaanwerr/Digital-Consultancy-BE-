const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class IndividualTaxReturnRepo extends BaseRepository {
  constructor() {
    super(db.IndividualTaxReturn);
    this.model = db.IndividualTaxReturn;
  }

  async createTaxReturn(data) {
    return this.create(data);
  }

  async findTaxReturn(customQuery = null) {
    return this.findOne(customQuery);
  }

  async findTaxReturns(customQuery = null) {
    return this.findAll(customQuery);
  }

  async updateTaxReturn(id, data) {
    return this.update(data, {
      where: { id }
    });
  }

  async deleteTaxReturn(id) {
    return this.delete({
      where: { id }
    });
  }

  async findTaxReturnByUserAndYear(userId, taxYear) {
    return this.findOne({
      where: { userId, taxYear },
      include: [
        { model: db.IndividualTaxReturnBasicInfo, as: "basicInfo" },
        { model: db.IndividualTaxReturnPersonalInfo, as: "personalInfo" },
        { model: db.IndividualTaxReturnFbrInfo, as: "fbrInfo" }
      ]
    });
  }
}

module.exports = new IndividualTaxReturnRepo(); 