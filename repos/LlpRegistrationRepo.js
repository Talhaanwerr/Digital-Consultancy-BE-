const BaseRepository = require("./BaseRepo");
const db = require("../models/index.js");

class LlpRegistrationRepo extends BaseRepository {
  constructor() {
    super(db.LlpRegistration);
    this.model = db.LlpRegistration;
  }

  async createLlpRegistration(data, transaction = null) {
    return this.create(data, { transaction });
  }

  async findLlpRegistration(customQuery = null) {
    return this.findOne(customQuery);
  }

  async findLlpRegistrations(customQuery = null) {
    return this.findAll(customQuery);
  }

  async findAndCountLlpRegistrations(customQuery = null) {
    return this.model.findAndCountAll(customQuery);
  }

  async updateLlpRegistration(id, data, transaction = null) {
    return this.update(data, {
      where: { id },
      transaction
    });
  }

  async deleteLlpRegistration(id, transaction = null) {
    return this.delete({
      where: { id },
      transaction
    });
  }
}

module.exports = new LlpRegistrationRepo(); 