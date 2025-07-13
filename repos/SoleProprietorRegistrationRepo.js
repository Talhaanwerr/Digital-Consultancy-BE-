const BaseRepository = require("./BaseRepo");
const db = require("../models/index.js");

class SoleProprietorRegistrationRepo extends BaseRepository {
  constructor() {
    super(db.SoleProprietorRegistration);
    this.model = db.SoleProprietorRegistration;
  }

  async createSoleProprietorRegistration(data) {
    return this.create(data);
  }

  async findSoleProprietorRegistration(customQuery = null) {
    return this.findOne(customQuery);
  }

  async findSoleProprietorRegistrations(customQuery = null) {
    return this.findAll(customQuery);
  }

  async findAndCountSoleProprietorRegistrations(customQuery = null) {
    return this.model.findAndCountAll(customQuery);
  }

  async updateSoleProprietorRegistration(id, data) {
    return this.update(data, {
      where: { id }
    });
  }

  async deleteSoleProprietorRegistration(id) {
    return this.delete({
      where: { id }
    });
  }

  async findByUserIdAndBusinessName(userId, businessName) {
    return this.findOne({
      where: { userId, businessName },
      include: [
        {
          model: db.User,
          as: "user",
          attributes: ["id", "firstName", "lastName", "email"]
        }
      ]
    });
  }
}

module.exports = new SoleProprietorRegistrationRepo(); 