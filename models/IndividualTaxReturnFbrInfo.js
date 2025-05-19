"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class IndividualTaxReturnFbrInfo extends Model {
    static associate(models) {
      // Define associations
      IndividualTaxReturnFbrInfo.belongsTo(models.IndividualTaxReturn, {
        foreignKey: "individualTaxReturnId",
        as: "taxReturn",
        onDelete: "CASCADE",
      });
    }
  }
  
  IndividualTaxReturnFbrInfo.init(
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
      isFbrRegistered: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      cnicOrNtnNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      irisPassword: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nicFrontUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nicBackUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "IndividualTaxReturnFbrInfo",
    }
  );
  
  return IndividualTaxReturnFbrInfo;
}; 