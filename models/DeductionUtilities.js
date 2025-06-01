"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DeductionUtilities extends Model {
    static associate(models) {
      // Define associations
      DeductionUtilities.belongsTo(models.IndividualTaxReturn, {
        foreignKey: "individualTaxReturnId",
        as: "taxReturn",
        onDelete: "CASCADE",
      });
    }
  }
  
  DeductionUtilities.init(
    {
      individualTaxReturnId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "IndividualTaxReturn",
          key: "id",
        }
      },
      utilityType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      providerName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      taxDeductedPKR: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
      },
      consumerRefNo: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: "DeductionUtilities",
    }
  );
  
  return DeductionUtilities;
}; 