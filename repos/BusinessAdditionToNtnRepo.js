const BaseRepository = require("./BaseRepo");
const db = require("../models/index.js");

class BusinessAdditionToNtnRepo extends BaseRepository {
  constructor() {
    super(db.BusinessAdditionToNtn);
    this.model = db.BusinessAdditionToNtn;
  }

  async createBusinessAdditionToNtn(data) {
    return this.create(data);
  }

  async findBusinessAdditionToNtn(customQuery = null) {
    return this.findOne(customQuery);
  }

  async findBusinessAdditionToNtns(customQuery = null) {
    return this.findAll(customQuery);
  }

  async findAndCountBusinessAdditionToNtns(customQuery = null) {
    return this.model.findAndCountAll(customQuery);
  }

  async updateBusinessAdditionToNtn(id, data) {
    return this.update(data, {
      where: { id }
    });
  }

  async deleteBusinessAdditionToNtn(id) {
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

module.exports = new BusinessAdditionToNtnRepo(); 