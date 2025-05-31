const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class PropertySaleIncomeRepo extends BaseRepository {
  constructor() {
    super(db.PropertySaleIncome);
    this.model = db.PropertySaleIncome;
  }

  async createPropertySaleIncome(data) {
    return this.create(data);
  }

  async findPropertySaleIncome(customQuery = null) {
    return this.findOne(customQuery);
  }

  async findAll(customQuery = null) {
    return this.findMany(customQuery);
  }

  async updatePropertySaleIncome(id, data) {
    return this.update(data, {
      where: { id }
    });
  }

  async findByTaxReturnId(individualTaxReturnId) {
    return this.findMany({
      where: { individualTaxReturnId }
    });
  }
}

module.exports = new PropertySaleIncomeRepo(); 