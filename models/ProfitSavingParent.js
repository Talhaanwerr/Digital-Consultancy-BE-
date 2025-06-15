'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProfitSavingParent extends Model {
    static associate(models) {
      // Define association with IndividualTaxReturn
      ProfitSavingParent.belongsTo(models.IndividualTaxReturn, {
        foreignKey: 'individualTaxReturnId',
        as: 'taxReturn',
        onDelete: 'CASCADE',
      });

      // Define associations with child models
      ProfitSavingParent.hasMany(models.ProfitSavingBank, {
        foreignKey: 'parentId',
        as: 'bankProfit',
        onDelete: 'CASCADE',
      });

      ProfitSavingParent.hasOne(models.ProfitSavingBehbood, {
        foreignKey: 'parentId',
        as: 'behboodProfit',
        onDelete: 'CASCADE',
      });

      ProfitSavingParent.hasMany(models.ProfitSavingGovtScheme, {
        foreignKey: 'parentId',
        as: 'govtSchemeProfit',
        onDelete: 'CASCADE',
      });

      ProfitSavingParent.hasOne(models.ProfitSavingPensionerBenefit, {
        foreignKey: 'parentId',
        as: 'pensionerBenefitProfit',
        onDelete: 'CASCADE',
      });
    }
  }

  ProfitSavingParent.init(
    {
      individualTaxReturnId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'IndividualTaxReturns',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: "ProfitSavingParent",
    }
  );

  return ProfitSavingParent;
}; 