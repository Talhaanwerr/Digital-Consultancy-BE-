const BaseRepository = require("./BaseRepo");
const db = require("../models/index.js");

class PvtLtdNomineeRepo extends BaseRepository {
  constructor() {
    super(db.PvtLtdNominee);
    this.model = db.PvtLtdNominee;
  }

  async createPvtLtdNominee(data, transaction = null) {
    return this.create(data, { transaction });
  }

  async findPvtLtdNominee(customQuery = null) {
    return this.findOne(customQuery);
  }

  async findPvtLtdNominees(customQuery = null) {
    return this.findAll(customQuery);
  }

  async updatePvtLtdNominee(id, data, transaction = null) {
    return this.update(data, {
      where: { id },
      transaction
    });
  }

  async upsertPvtLtdNominee(data, transaction = null) {
    const nominee = await this.findPvtLtdNominee({
      where: { pvtLtdRegistrationId: data.pvtLtdRegistrationId }
    });

    if (nominee) {
      return this.update(data, {
        where: { id: nominee.id },
        transaction
      });
    } else {
      return this.create(data, { transaction });
    }
  }

  async deletePvtLtdNominee(id, transaction = null) {
    return this.delete({
      where: { id },
      transaction
    });
  }

  async deletePvtLtdNomineeByPvtLtdRegistrationId(pvtLtdRegistrationId, transaction = null) {
    return this.delete({
      where: { pvtLtdRegistrationId },
      transaction
    });
  }
}

module.exports = new PvtLtdNomineeRepo(); 