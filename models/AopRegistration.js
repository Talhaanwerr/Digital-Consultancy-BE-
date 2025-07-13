'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AopRegistration extends Model {
    static associate(models) {
      AopRegistration.hasMany(models.AopPartner, { 
        foreignKey: 'aopRegistrationId',
        onDelete: 'CASCADE',
        as: 'partners'
      });
      AopRegistration.belongsTo(models.User, { 
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE'
      });
    }
  }
  
  AopRegistration.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    preferredName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    secondName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    thirdName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    totalInvestmentPKR: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    },
    companyAddress: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    applicationStatus: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'pending'
    },
    invoiceStatus: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'unpaid'
    },
    receiptImageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'AopRegistration',
  });
  
  return AopRegistration;
}; 