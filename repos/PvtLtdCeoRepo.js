const BaseRepository = require("./BaseRepo");
const db = require("../models/index.js");

class PvtLtdCeoRepo extends BaseRepository {
  constructor() {
    super(db.PvtLtdCeo);
    this.model = db.PvtLtdCeo;
  }

  async createPvtLtdCeo(data, transaction = null) {
    return this.create(data, { transaction });
  }

  async findPvtLtdCeo(customQuery = null) {
    return this.findOne(customQuery);
  }

  async findPvtLtdCeos(customQuery = null) {
    return this.findAll(customQuery);
  }

  async updatePvtLtdCeo(id, data, transaction = null) {
    return this.update(data, {
      where: { id },
      transaction
    });
  }

  async upsertPvtLtdCeo(data, transaction = null) {
    const ceo = await this.findPvtLtdCeo({
      where: { pvtLtdRegistrationId: data.pvtLtdRegistrationId }
    });

    if (ceo) {
      return this.update(data, {
        where: { id: ceo.id },
        transaction
      });
    } else {
      return this.create(data, { transaction });
    }
  }

  async deletePvtLtdCeo(id, transaction = null) {
    return this.delete({
      where: { id },
      transaction
    });
  }

  async deletePvtLtdCeoByPvtLtdRegistrationId(pvtLtdRegistrationId, transaction = null) {
    return this.delete({
      where: { pvtLtdRegistrationId },
      transaction
    });
  }
}

module.exports = new PvtLtdCeoRepo(); 