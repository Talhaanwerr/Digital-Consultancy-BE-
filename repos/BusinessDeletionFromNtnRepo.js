const BaseRepository = require("./BaseRepo");
const db = require("../models/index.js");

class BusinessDeletionFromNtnRepo extends BaseRepository {
  constructor() {
    super(db.BusinessDeletionFromNtn);
    this.model = db.BusinessDeletionFromNtn;
  }

  async createBusinessDeletionFromNtn(data) {
    return this.create(data);
  }

  async findBusinessDeletionFromNtn(customQuery = null) {
    return this.findOne(customQuery);
  }

  async findBusinessDeletionFromNtns(customQuery = null) {
    return this.findAll(customQuery);
  }

  async findAndCountBusinessDeletionFromNtns(customQuery = null) {
    return this.model.findAndCountAll(customQuery);
  }

  async updateBusinessDeletionFromNtn(id, data) {
    return this.update(data, {
      where: { id }
    });
  }

  async deleteBusinessDeletionFromNtn(id) {
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

module.exports = new BusinessDeletionFromNtnRepo(); 