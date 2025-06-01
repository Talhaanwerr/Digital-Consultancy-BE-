"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class IndividualTaxReturn_TaxDeductionCategory extends Model {
    static associate(models) {
      // Associations defined in the respective models
    }
  }
  
  IndividualTaxReturn_TaxDeductionCategory.init(
    {
      individualTaxReturnId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "IndividualTaxReturn",
          key: "id",
        }
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "TaxDeductionCategory",
          key: "id",
        }
      }
    },
    {
      sequelize,
      modelName: "IndividualTaxReturn_TaxDeductionCategory",
      tableName: "IndividualTaxReturn_TaxDeductionCategory"
    }
  );
  
  return IndividualTaxReturn_TaxDeductionCategory;
}; 