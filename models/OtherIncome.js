"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OtherIncome extends Model {
    static associate(models) {
      // Define associations
      OtherIncome.belongsTo(models.IndividualTaxReturn, {
        foreignKey: "individualTaxReturnId",
        as: "taxReturn",
        onDelete: "CASCADE",
      });
    }
  }
  
  OtherIncome.init(
    {
      individualTaxReturnId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "IndividualTaxReturn",
          key: "id",
        },
      },
      incomeType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amountPKR: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "OtherIncome",
    }
  );
  
  return OtherIncome;
}; 