"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PensionIncome extends Model {
    static associate(models) {
      // Define associations
      PensionIncome.belongsTo(models.IndividualTaxReturn, {
        foreignKey: "individualTaxReturnId",
        as: "taxReturn",
        onDelete: "CASCADE",
      });
    }
  }
  
  PensionIncome.init(
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
      annualPensionPKR: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "PensionIncome",
    }
  );
  
  return PensionIncome;
}; 