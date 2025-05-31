"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PropertySaleIncome extends Model {
    static associate(models) {
      // Define associations
      PropertySaleIncome.belongsTo(models.IndividualTaxReturn, {
        foreignKey: "individualTaxReturnId",
        as: "taxReturn",
        onDelete: "CASCADE",
      });
    }
  }
  
  PropertySaleIncome.init(
    {
      individualTaxReturnId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "IndividualTaxReturn",
          key: "id",
        }
      },
      propertyType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      purchaseDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      saleDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      purchasePricePKR: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      salePricePKR: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      propertyAddress: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      advanceTaxChallanUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "PropertySaleIncome",
    }
  );
  
  return PropertySaleIncome;
}; 