const BaseRepository = require("./BaseRepo");
const db = require("../models/index.js");

class LlpPartnerRepo extends BaseRepository {
  constructor() {
    super(db.LlpPartner);
    this.model = db.LlpPartner;
  }

  async createLlpPartner(data, transaction = null) {
    return this.create(data, { transaction });
  }

  async bulkCreateLlpPartners(data, transaction = null) {
    return this.bulkCreate(data, { transaction });
  }

  async findLlpPartner(customQuery = null) {
    return this.findOne(customQuery);
  }

  async findLlpPartners(customQuery = null) {
    return this.findAll(customQuery);
  }

  async updateLlpPartner(id, data, transaction = null) {
    return this.update(data, {
      where: { id },
      transaction
    });
  }

  async deleteLlpPartner(id, transaction = null) {
    return this.delete({
      where: { id },
      transaction
    });
  }

  async deleteLlpPartnersByLlpRegistrationId(llpRegistrationId, transaction = null) {
    return this.delete({
      where: { llpRegistrationId },
      transaction
    });
  }
}

module.exports = new LlpPartnerRepo(); 