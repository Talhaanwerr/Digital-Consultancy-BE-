const { WealthStatement } = require("../models");
const BaseRepo = require("./BaseRepo.js");

class WealthStatementRepo extends BaseRepo {
  constructor() {
    super(WealthStatement);
  }
  
  // Find wealth statement by tax return ID
  async findByTaxReturnId(taxReturnId) {
    return await this.findOne({
      where: { individualTaxReturnId: taxReturnId },
    });
  }
  
  // Upsert wealth statement (create or update)
  async upsertWealthStatement(data, transaction = null) {
    const { individualTaxReturnId, opening, assets, liabilities, expense } = data;
    
    // First try to find
    const existing = await this.findOne({
      where: { individualTaxReturnId },
      transaction,
    });
    
    // If found, update it
    if (existing) {
      await this.update(
        {
          opening,
          assets,
          liabilities,
          expense,
        },
        {
          where: { individualTaxReturnId },
          transaction,
        }
      );
      return [await this.findOne({ where: { individualTaxReturnId }, transaction }), false];
    }
    
    // If not found, create it
    const created = await this.create(
      {
        individualTaxReturnId,
        opening,
        assets,
        liabilities,
        expense,
      },
      { transaction }
    );
    return [created, true];
  }

//     "cash": [
//         {
//             "totalCash": 400000
//         }
//     ],
//     "other": [
//         {
//             "description": "3 flats in Karachi",
//             "totalAmount": 3425
//         }
//     ],
//     "vehicle": [
//         {
//             "vehiclesValue": 5000000,
//             "numberOfVehicle": 3,
//             "vehiclesDescription": "3 flats in Karachi"
//         }
//     ],
//     "property": [
//         {
//             "propertiesValue": 5000000,
//             "numberOfProperties": 3,
//             "propertiesDescription": "3 flats in Karachi"
//         }
//     ],
//     "insurance": [
//         {
//             "amountPaid": 400000,
//             "companyName": "sfafa",
//             "policyNumber": 400000
//         }
//     ],
//     "bankAccount": [
//         {
//             "bankNames": "3",
//             "totalAmount": 5000000,
//             "numberOfAccounts": 3
//         }
//     ],
//     "possesssion": [
//         {
//             "totalCash": 400000,
//             "possesssionDescription ": "3"
//         }
//     ],
//     "foreignAssets": [
//         {
//             "totalAmount": 3425,
//             "assetsDescription": "3 flats in Karachi"
//         }
//     ],
//     "businessCapital": [
//         {
//             "businessName": "3 flats in Karachi",
//             "totalCapital": 3425,
//             "numberOfBusiness": 3
//         }
//     ]
// }
  
  // Delete wealth statement by tax return ID
  async deleteByTaxReturnId(taxReturnId, transaction = null) {
    return await this.delete({
      where: { individualTaxReturnId: taxReturnId },
      transaction,
    });
  }
}

module.exports = new WealthStatementRepo(); 