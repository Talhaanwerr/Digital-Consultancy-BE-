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
      
      // Income models associations
      IndividualTaxReturn.hasOne(models.SalaryIncome, {
        foreignKey: "individualTaxReturnId",
        as: "salaryIncome",
        onDelete: "CASCADE",
      });
      
      IndividualTaxReturn.hasOne(models.PensionIncome, {
        foreignKey: "individualTaxReturnId",
        as: "pensionIncome",
        onDelete: "CASCADE",
      });
      
      IndividualTaxReturn.hasOne(models.RentalIncome, {
        foreignKey: "individualTaxReturnId",
        as: "rentalIncome",
        onDelete: "CASCADE",
      });

      // Adding missing income model associations
      IndividualTaxReturn.hasMany(models.PropertySaleIncome, {
        foreignKey: "individualTaxReturnId",
        as: "propertySaleIncome",
        onDelete: "CASCADE",
      });

      IndividualTaxReturn.hasOne(models.AgricultureIncome, {
        foreignKey: "individualTaxReturnId",
        as: "agricultureIncome",
        onDelete: "CASCADE",
      });

      IndividualTaxReturn.hasMany(models.PartnershipIncome, {
        foreignKey: "individualTaxReturnId",
        as: "partnershipIncome",
        onDelete: "CASCADE",
      });

      IndividualTaxReturn.hasOne(models.FreelancerIncome, {
        foreignKey: "individualTaxReturnId",
        as: "freelancerIncome",
        onDelete: "CASCADE",
      });

      IndividualTaxReturn.hasOne(models.ProfessionIncome, {
        foreignKey: "individualTaxReturnId",
        as: "professionIncome",
        onDelete: "CASCADE",
      });

      IndividualTaxReturn.hasOne(models.CommissionIncome, {
        foreignKey: "individualTaxReturnId",
        as: "commissionIncome",
        onDelete: "CASCADE",
      });

      IndividualTaxReturn.hasOne(models.DividendCapitalGainIncome, {
        foreignKey: "individualTaxReturnId",
        as: "dividendCapitalGainIncome",
        onDelete: "CASCADE",
      });

      IndividualTaxReturn.hasOne(models.BusinessIncome, {
        foreignKey: "individualTaxReturnId",
        as: "businessIncome",
        onDelete: "CASCADE",
      });

      IndividualTaxReturn.hasMany(models.OtherIncome, {
        foreignKey: "individualTaxReturnId",
        as: "otherIncomes",
        onDelete: "CASCADE",
      });

      // Tax Deduction Categories association
      IndividualTaxReturn.belongsToMany(models.TaxDeductionCategory, {
        through: "IndividualTaxReturn_TaxDeductionCategory",
        foreignKey: "individualTaxReturnId",
        otherKey: "categoryId",
        as: "deductionCategories"
      });

      // Tax Benefits association
      IndividualTaxReturn.hasOne(models.TaxBenefitCredit, {
        foreignKey: "individualTaxReturnId",
        as: "taxBenefits",
        onDelete: "CASCADE",
      });

      // Tax Deduction models associations
      IndividualTaxReturn.hasMany(models.DeductionBank, {
        foreignKey: "individualTaxReturnId",
        as: "bankDeductions",
        onDelete: "CASCADE",
      });

      IndividualTaxReturn.hasMany(models.DeductionVehicle, {
        foreignKey: "individualTaxReturnId",
        as: "vehicleDeductions",
        onDelete: "CASCADE",
      });

      IndividualTaxReturn.hasMany(models.DeductionUtilities, {
        foreignKey: "individualTaxReturnId",
        as: "utilitiesDeductions",
        onDelete: "CASCADE",
      });

      IndividualTaxReturn.hasMany(models.DeductionProperty, {
        foreignKey: "individualTaxReturnId",
        as: "propertyDeductions",
        onDelete: "CASCADE",
      });

      IndividualTaxReturn.hasOne(models.DeductionOthers, {
        foreignKey: "individualTaxReturnId",
        as: "otherDeductions",
        onDelete: "CASCADE",
      });

      // Wealth Statement association
      IndividualTaxReturn.hasOne(models.WealthStatement, {
        foreignKey: "individualTaxReturnId",
        as: "wealthStatement",
        onDelete: "CASCADE",
      });

      // Profit Saving association
      IndividualTaxReturn.hasOne(models.ProfitSavingParent, {
        foreignKey: "individualTaxReturnId",
        as: "profitSavingParent",
        onDelete: "CASCADE",
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