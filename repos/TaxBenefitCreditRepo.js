const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class TaxBenefitCreditRepo extends BaseRepository {
  constructor() {
    super(db.TaxBenefitCredit);
    this.model = db.TaxBenefitCredit;
  }

  async createTaxBenefitCredit(data) {
    return this.create(data);
  }

  async findTaxBenefitCredit(customQuery = null) {
    return this.findOne(customQuery);
  }

  async updateTaxBenefitCredit(individualTaxReturnId, data) {
    return this.update(data, {
      where: { individualTaxReturnId }
    });
  }

  async upsertTaxBenefitCredit(data) {
    const { individualTaxReturnId } = data;
    const existing = await this.findTaxBenefitCredit({
      where: { individualTaxReturnId }
    });

    if (existing) {
      return this.updateTaxBenefitCredit(individualTaxReturnId, data);
    } else {
      return this.createTaxBenefitCredit(data);
    }
  }

  async findByTaxReturnId(individualTaxReturnId) {
    return this.findOne({
      where: { individualTaxReturnId }
    });
  }
}

module.exports = new TaxBenefitCreditRepo(); 