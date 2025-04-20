const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class RoleRepo extends BaseRepository {
  model;
  constructor() {
    super(db.Role);
    this.model = db.Role;
  }

  async createRole(role) {
    return this.create(role);
  }

  async findRole(customQuery = null) {
    return this.findOne(customQuery);
  }

  async findRoles(customQuery = null) {
    return this.findAll(customQuery);
  }

  async updateRole(id, data) {
    return this.update(data, {
      where: { id }
    });
  }

  async deleteRole(id) {
    return this.delete({
      where: { id }
    });
  }
}

module.exports = new RoleRepo();
