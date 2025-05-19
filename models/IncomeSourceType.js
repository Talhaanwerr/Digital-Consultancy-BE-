"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class IncomeSourceType extends Model {
    static associate(models) {
      // Define associations
      IncomeSourceType.belongsToMany(models.IndividualTaxReturn, {
        through: "IndividualTaxReturn_IncomeSources",
        foreignKey: "incomeSourceTypeId",
        otherKey: "individualTaxReturnId",
        as: "taxReturns"
      });
    }
  }
  
  IncomeSourceType.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      }
    },
    {
      sequelize,
      modelName: "IncomeSourceType",
    }
  );
  
  return IncomeSourceType;
}; 