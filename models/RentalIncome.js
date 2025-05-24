"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RentalIncome extends Model {
    static associate(models) {
      // Define associations
      RentalIncome.belongsTo(models.IndividualTaxReturn, {
        foreignKey: "individualTaxReturnId",
        as: "taxReturn",
        onDelete: "CASCADE",
      });
    }
  }
  
  RentalIncome.init(
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
      rentReceivedPKR: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
        defaultValue: 0,
      },
      taxDeductedByTenantPKR: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
        defaultValue: 0,
      },
      propertyExpensesPKR: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "RentalIncome",
    }
  );
  
  return RentalIncome;
}; 