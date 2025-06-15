"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ProfitSavingBank extends Model {
    static associate(models) {
      // Define association with ProfitSavingParent
      ProfitSavingBank.belongsTo(models.ProfitSavingParent, {
        foreignKey: "parentId",
        as: "parent",
        onDelete: "CASCADE",
      });
    }
  }

  ProfitSavingBank.init(
    {
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "ProfitSavingParents",
          key: "id",
        },
      },
      bankName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      accountNumber: {
        type: DataTypes.STRING(50),
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
      modelName: "ProfitSavingBank",
    }
  );

  return ProfitSavingBank;
}; 