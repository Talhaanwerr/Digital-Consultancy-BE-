"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class IndividualTaxReturnBasicInfo extends Model {
    static associate(models) {
      // Define associations
      IndividualTaxReturnBasicInfo.belongsTo(models.IndividualTaxReturn, {
        foreignKey: "individualTaxReturnId",
        as: "taxReturn",
        onDelete: "CASCADE",
      });
    }
  }
  
  IndividualTaxReturnBasicInfo.init(
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
      isPakistaniNational: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      identifierType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      identifierNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "IndividualTaxReturnBasicInfo",
    }
  );
  
  return IndividualTaxReturnBasicInfo;
}; 