"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CommissionIncome extends Model {
    static associate(models) {
      // Define associations
      CommissionIncome.belongsTo(models.IndividualTaxReturn, {
        foreignKey: "individualTaxReturnId",
        as: "taxReturn",
        onDelete: "CASCADE",
      });
    }
  }
  
  CommissionIncome.init(
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
      lifeInsuranceAgentJson: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      generalInsuranceAgentJson: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      realEstateTravelAgentJson: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      otherCommissionJson: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "CommissionIncome",
    }
  );
  
  return CommissionIncome;
}; 