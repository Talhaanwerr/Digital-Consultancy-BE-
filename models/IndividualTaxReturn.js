"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class IndividualTaxReturn extends Model {
    static associate(models) {
      // Define associations
      IndividualTaxReturn.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      
      IndividualTaxReturn.hasOne(models.IndividualTaxReturnBasicInfo, {
        foreignKey: "individualTaxReturnId",
        as: "basicInfo",
        onDelete: "CASCADE",
      });
      
      IndividualTaxReturn.hasOne(models.IndividualTaxReturnPersonalInfo, {
        foreignKey: "individualTaxReturnId",
        as: "personalInfo",
        onDelete: "CASCADE",
      });
      
      IndividualTaxReturn.hasOne(models.IndividualTaxReturnFbrInfo, {
        foreignKey: "individualTaxReturnId",
        as: "fbrInfo",
        onDelete: "CASCADE",
      });
      
      IndividualTaxReturn.belongsToMany(models.IncomeSourceType, {
        through: "IndividualTaxReturn_IncomeSources",
        foreignKey: "individualTaxReturnId",
        otherKey: "incomeSourceTypeId",
        as: "incomeSources"
      });
    }
  }
  
  IndividualTaxReturn.init(
    {
      filingFor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      taxYear: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      applicationStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "draft",
      },
      invoiceStatus: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      receiptImageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "incomplete",
      },
    },
    {
      sequelize,
      modelName: "IndividualTaxReturn",
    }
  );
  
  return IndividualTaxReturn;
}; 