const BaseRepository = require("./BaseRepo");
const db = require("../models/index.js");

class RateListRepo extends BaseRepository {
  model;
  constructor() {
    super(db.RateList);
    this.model = db.RateList;
  }

  async createRateList(data) {
    return this.create(data);
  }

  async findRateLists(customQuery = null) {
    return this.findAll(customQuery);
  }

  async findRateListById(id) {
    return this.findOne({
      where: { id }
    });
  }

  async updateRateList(id, data) {
    return this.update(data, {
      where: { id }
    });
  }

  async deleteRateList(id) {
    return this.delete({
      where: { id }
    });
  }

  async findRateListsByCategory(category) {
    return this.findAll({
      where: { category }
    });
  }
}

module.exports = new RateListRepo(); 