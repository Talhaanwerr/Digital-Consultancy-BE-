"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ProfitSavingGovtScheme extends Model {
    static associate(models) {
      // Define association with ProfitSavingParent
      ProfitSavingGovtScheme.belongsTo(models.ProfitSavingParent, {
        foreignKey: "parentId",
        as: "parent",
        onDelete: "CASCADE",
      });
    }
  }

  ProfitSavingGovtScheme.init(
    {
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "ProfitSavingParents",
          key: "id",
        },
      },
      schemeType: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      profitPKR: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0.00,
      },
      taxDeductedPKR: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0.00,
      },
    },
    {
      sequelize,
      modelName: "ProfitSavingGovtScheme",
    }
  );

  return ProfitSavingGovtScheme;
}; 