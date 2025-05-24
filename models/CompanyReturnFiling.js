"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CompanyReturnFiling extends Model {
    static associate(models) {
      // Define associations
      CompanyReturnFiling.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  
  CompanyReturnFiling.init(
    {
      taxYear: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      businessNature: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      businessType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      applicationStatus: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "requested",
      },
      invoiceStatus: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "unpaid",
      },
      receiptImageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bankStatementPdfUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      financialStatementPdfUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "CompanyReturnFiling",
    }
  );
  
  return CompanyReturnFiling;
}; 