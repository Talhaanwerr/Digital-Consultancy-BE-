const BaseRepository = require("./BaseRepo");
const db = require("../models/index.js");

class AopRegistrationRepo extends BaseRepository {
  constructor() {
    super(db.AopRegistration);
    this.model = db.AopRegistration;
  }

  async createAopRegistration(data, transaction = null) {
    return this.create(data, { transaction });
  }

  async findAopRegistration(customQuery = null) {
    return this.findOne(customQuery);
  }

  async findAopRegistrations(customQuery = null) {
    return this.findAll(customQuery);
  }

  async findAndCountAopRegistrations(customQuery = null) {
    return this.model.findAndCountAll(customQuery);
  }

  async updateAopRegistration(id, data, transaction = null) {
    return this.update(data, {
      where: { id },
      transaction
    });
  }

  async deleteAopRegistration(id, transaction = null) {
    return this.delete({
      where: { id },
      transaction
    });
  }
}

module.exports = new AopRegistrationRepo(); 