"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProfessionIncome extends Model {
    static associate(models) {
      // Define associations
      ProfessionIncome.belongsTo(models.IndividualTaxReturn, {
        foreignKey: "individualTaxReturnId",
        as: "taxReturn",
        onDelete: "CASCADE",
      });
    }
  }
  
  ProfessionIncome.init(
    {
      individualTaxReturnId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "IndividualTaxReturn",
          key: "id",
        },
        unique: true,
      },
      profession: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      professionRevenueJson: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      expenseSheetJson: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      balanceSheetJson: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      otherAdjustableTaxJson: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "ProfessionIncome",
    }
  );
  
  return ProfessionIncome;
}; 