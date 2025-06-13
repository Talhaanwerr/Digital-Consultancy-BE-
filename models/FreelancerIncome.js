"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FreelancerIncome extends Model {
    static associate(models) {
      // Define associations
      FreelancerIncome.belongsTo(models.IndividualTaxReturn, {
        foreignKey: "individualTaxReturnId",
        as: "taxReturn",
        onDelete: "CASCADE",
      });
    }
  }
  
  FreelancerIncome.init(
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
      earnsAbroadITYN: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      registeredWithPsebYN: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      freelanceRevenueJson: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      expenseSheetJson: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      balanceSheetJson: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      otherAdjustableTaxJson: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "FreelancerIncome",
    }
  );
  
  return FreelancerIncome;
}; 