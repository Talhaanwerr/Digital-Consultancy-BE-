const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class IncomeSourceTypeRepo extends BaseRepository {
  constructor() {
    super(db.IncomeSourceType);
    this.model = db.IncomeSourceType;
  }

  async findAllIncomeSourceTypes(query) {
    return this.findAll();
  }

  async findIncomeSourceType(id) {
    return this.findOne({
      where: { id }
    });
  }
}

module.exports = new IncomeSourceTypeRepo(); 