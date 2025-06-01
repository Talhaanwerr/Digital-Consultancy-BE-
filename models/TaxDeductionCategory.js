"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TaxDeductionCategory extends Model {
    static associate(models) {
      // Define associations
      TaxDeductionCategory.belongsToMany(models.IndividualTaxReturn, {
        through: "IndividualTaxReturn_TaxDeductionCategory",
        foreignKey: "categoryId",
        otherKey: "individualTaxReturnId",
        as: "taxReturns"
      });
    }
  }
  
  TaxDeductionCategory.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      sequelize,
      modelName: "TaxDeductionCategory",
    }
  );
  
  return TaxDeductionCategory;
}; 