const BaseRepository = require("./BaseRepo");
const db = require("../models/index.js");

class PvtLtdRegistrationRepo extends BaseRepository {
  constructor() {
    super(db.PvtLtdRegistration);
    this.model = db.PvtLtdRegistration;
  }

  async createPvtLtdRegistration(data, transaction = null) {
    return this.create(data, { transaction });
  }

  async findPvtLtdRegistration(customQuery = null) {
    return this.findOne(customQuery);
  }

  async findPvtLtdRegistrations(customQuery = null) {
    return this.findAll(customQuery);
  }

  async findAndCountPvtLtdRegistrations(customQuery = null) {
    return this.model.findAndCountAll(customQuery);
  }

  async updatePvtLtdRegistration(id, data, transaction = null) {
    return this.update(data, {
      where: { id },
      transaction
    });
  }

  async deletePvtLtdRegistration(id, transaction = null) {
    return this.delete({
      where: { id },
      transaction
    });
  }
}

module.exports = new PvtLtdRegistrationRepo(); 