const BaseRepository = require("./BaseRepo");
const db = require("../models/index.js");

class AopPartnerRepo extends BaseRepository {
  constructor() {
    super(db.AopPartner);
    this.model = db.AopPartner;
  }

  async createAopPartner(data, transaction = null) {
    return this.create(data, { transaction });
  }

  async bulkCreateAopPartners(data, transaction = null) {
    return this.bulkCreate(data, { transaction });
  }

  async findAopPartner(customQuery = null) {
    return this.findOne(customQuery);
  }

  async findAopPartners(customQuery = null) {
    return this.findAll(customQuery);
  }

  async updateAopPartner(id, data, transaction = null) {
    return this.update(data, {
      where: { id },
      transaction
    });
  }

  async deleteAopPartner(id, transaction = null) {
    return this.delete({
      where: { id },
      transaction
    });
  }

  async deleteAopPartnersByAopRegistrationId(aopRegistrationId, transaction = null) {
    return this.delete({
      where: { aopRegistrationId },
      transaction
    });
  }
}

module.exports = new AopPartnerRepo(); 