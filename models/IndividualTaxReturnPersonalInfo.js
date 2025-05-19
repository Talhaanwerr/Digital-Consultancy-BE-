"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class IndividualTaxReturnPersonalInfo extends Model {
    static associate(models) {
      // Define associations
      IndividualTaxReturnPersonalInfo.belongsTo(models.IndividualTaxReturn, {
        foreignKey: "individualTaxReturnId",
        as: "taxReturn",
        onDelete: "CASCADE",
      });
    }
  }
  
  IndividualTaxReturnPersonalInfo.init(
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
      occupation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isResidentForTaxYear: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "IndividualTaxReturnPersonalInfo",
    }
  );
  
  return IndividualTaxReturnPersonalInfo;
}; 