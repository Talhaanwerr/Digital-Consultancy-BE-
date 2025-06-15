"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ProfitSavingPensionerBenefit extends Model {
    static associate(models) {
      // Define association with ProfitSavingParent
      ProfitSavingPensionerBenefit.belongsTo(models.ProfitSavingParent, {
        foreignKey: "parentId",
        as: "parent",
        onDelete: "CASCADE",
      });
    }
  }

  ProfitSavingPensionerBenefit.init(
    {
      parentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "ProfitSavingParents",
          key: "id",
        },
      },
      profitPKR: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0.00,
      },
      investmentPKR: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0.00,
      },
    },
    {
      sequelize,
      modelName: "ProfitSavingPensionerBenefit",
    }
  );

  return ProfitSavingPensionerBenefit;
}; 