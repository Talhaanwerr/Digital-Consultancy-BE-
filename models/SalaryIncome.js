"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SalaryIncome extends Model {
    static associate(models) {
      // Define associations
      SalaryIncome.belongsTo(models.IndividualTaxReturn, {
        foreignKey: "individualTaxReturnId",
        as: "taxReturn",
        onDelete: "CASCADE",
      });
    }
  }
  
  SalaryIncome.init(
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
      annualTaxableSalaryPKR: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
        defaultValue: 0,
      },
      taxDeductedByEmployerPKR: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
        defaultValue: 0,
      },
      taDaPKR: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
        defaultValue: 0,
      },
      employerFreeMedicalYN: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      medicalAllowancePKR: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
        defaultValue: 0,
      },
      providentFundYN: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      providentFundAmountPKR: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
        defaultValue: 0,
      },
      employerVehicleYN: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      employerVehicleCostPKR: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
        defaultValue: 0,
      },
      otherAllowancesPKR: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
        defaultValue: 0,
      },
      providentGratuityWithdrawalPKR: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
        defaultValue: 0,
      },
      taxBorneByEmployerYN: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "SalaryIncome",
    }
  );
  
  return SalaryIncome;
}; 