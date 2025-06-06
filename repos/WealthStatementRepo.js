const { WealthStatement } = require("../models");
const BaseRepo = require("./BaseRepo.js");

class WealthStatementRepo extends BaseRepo {
  constructor() {
    super(WealthStatement);
  }
  
  // Find wealth statement by tax return ID
  async findByTaxReturnId(taxReturnId) {
    return await WealthStatement.findOne({
      where: { individualTaxReturnId: taxReturnId },
    });
  }
  
  // Upsert wealth statement (create or update)
  async upsertWealthStatement(data, transaction = null) {
    const { individualTaxReturnId, opening, assets, liabilities, expense } = data;
    
    return await WealthStatement.upsert(
      {
        individualTaxReturnId,
        opening,
        assets,
        liabilities,
        expense,
      },
      { transaction }
    );
  }
  
  // Delete wealth statement by tax return ID
  async deleteByTaxReturnId(taxReturnId, transaction = null) {
    return await WealthStatement.destroy({
      where: { individualTaxReturnId: taxReturnId },
      transaction,
    });
  }
}

module.exports = new WealthStatementRepo(); 