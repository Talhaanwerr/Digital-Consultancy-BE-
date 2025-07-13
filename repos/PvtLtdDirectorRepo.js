const BaseRepository = require("./BaseRepo");
const db = require("../models/index.js");

class PvtLtdDirectorRepo extends BaseRepository {
  constructor() {
    super(db.PvtLtdDirector);
    this.model = db.PvtLtdDirector;
  }

  async createPvtLtdDirector(data, transaction = null) {
    return this.create(data, { transaction });
  }

  async bulkCreatePvtLtdDirectors(data, transaction = null) {
    return this.bulkCreate(data, { transaction });
  }

  async findPvtLtdDirector(customQuery = null) {
    return this.findOne(customQuery);
  }

  async findPvtLtdDirectors(customQuery = null) {
    return this.findAll(customQuery);
  }

  async updatePvtLtdDirector(id, data, transaction = null) {
    return this.update(data, {
      where: { id },
      transaction
    });
  }

  async deletePvtLtdDirector(id, transaction = null) {
    return this.delete({
      where: { id },
      transaction
    });
  }

  async deletePvtLtdDirectorsByPvtLtdRegistrationId(pvtLtdRegistrationId, transaction = null) {
    return this.delete({
      where: { pvtLtdRegistrationId },
      transaction
    });
  }
}

module.exports = new PvtLtdDirectorRepo(); 