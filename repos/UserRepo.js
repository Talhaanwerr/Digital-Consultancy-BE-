const BaseRepository = require("./BaseRepo");
const db = require("../models/index.js");

class UserRepo extends BaseRepository {
  model;
  constructor() {
    super(db.User);
    this.model = db.User;
  }

  async createUser(user) {
    return this.create(user);
  }

  async findUsers(customQuery = null) {
    return this.findAll(customQuery);
  }

  async findUser(customQuery) {
    return this.findOne(customQuery);
  }

  async findAndCountUsers(customQuery = null) {
    return this.model.findAndCountAll(customQuery);
  }

  async updateUser(id, data) {
    return this.update(data, {
      where: { id }
    });
  }

  async deleteUser(id) {
    return this.delete({
      where: { id }
    });
  }
}

module.exports = new UserRepo();
