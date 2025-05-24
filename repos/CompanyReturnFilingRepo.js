const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class CompanyReturnFilingRepo extends BaseRepository {
  constructor() {
    super(db.CompanyReturnFiling);
    this.model = db.CompanyReturnFiling;
  }

  async createCompanyReturn(data) {
    return this.create(data);
  }

  async findCompanyReturn(customQuery = null) {
    return this.findOne(customQuery);
  }

  async findCompanyReturns(customQuery = null) {
    return this.findAll(customQuery);
  }

  async findAndCountCompanyReturns(customQuery = null) {
    return this.model.findAndCountAll(customQuery);
  }

  async updateCompanyReturn(id, data) {
    return this.update(data, {
      where: { id }
    });
  }

  async deleteCompanyReturn(id) {
    return this.delete({
      where: { id }
    });
  }

  async findCompanyReturnByUserAndYear(userId, taxYear) {
    return this.findOne({
      where: { userId, taxYear },
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

module.exports = new CompanyReturnFilingRepo(); 