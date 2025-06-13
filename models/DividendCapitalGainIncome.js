"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DividendCapitalGainIncome extends Model {
    static associate(models) {
      // Define associations
      DividendCapitalGainIncome.belongsTo(models.IndividualTaxReturn, {
        foreignKey: "individualTaxReturnId",
        as: "taxReturn",
        onDelete: "CASCADE",
      });
    }
  }
  
  DividendCapitalGainIncome.init(
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
      dividendIncomeJson: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      capitalGainJson: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      nccplStatementUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mutualFundsReportUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "DividendCapitalGainIncome",
    }
  );
  
  return DividendCapitalGainIncome;
}; 