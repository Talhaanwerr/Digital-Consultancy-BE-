"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class RateList extends Model {
    static associate(models) {
      // Define associations if needed in the future
    }
  }
  
  RateList.init(
    {
      title: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING(80),
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING(80),
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      requirements: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "RateList",
    }
  );
  
  return RateList;
}; 