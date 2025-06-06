"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class WealthStatement extends Model {
    static associate(models) {
      // Define association
      WealthStatement.belongsTo(models.IndividualTaxReturn, {
        foreignKey: "individualTaxReturnId",
        as: "individualTaxReturn",
      });
    }
  }
  
  WealthStatement.init(
    {
      individualTaxReturnId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: "IndividualTaxReturn",
          key: "id",
        },
      },
      opening: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      assets: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      liabilities: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      expense: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "WealthStatement",
    }
  );
  
  return WealthStatement;
}; 