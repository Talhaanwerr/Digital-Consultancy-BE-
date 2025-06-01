"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DeductionProperty extends Model {
    static associate(models) {
      // Define associations
      DeductionProperty.belongsTo(models.IndividualTaxReturn, {
        foreignKey: "individualTaxReturnId",
        as: "taxReturn",
        onDelete: "CASCADE",
      });
    }
  }
  
  DeductionProperty.init(
    {
      individualTaxReturnId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "IndividualTaxReturn",
          key: "id",
        }
      },
      transactionType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      propertyAddress: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      areaValue: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      areaUnit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      taxPaidPKR: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
      }
    },
    {
      sequelize,
      modelName: "DeductionProperty",
    }
  );
  
  return DeductionProperty;
}; 