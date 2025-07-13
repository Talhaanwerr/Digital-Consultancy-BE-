'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SoleProprietorRegistration extends Model {
    static associate(models) {
      // Define association with User model
      SoleProprietorRegistration.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE'
      });
    }
  }
  
  SoleProprietorRegistration.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
    businessName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    natureOfBusiness: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    businessAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    cnicFrontUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cnicBackUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rentAgreementUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    utilityBillUrl: {
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
    }
  }, {
    sequelize,
    modelName: 'SoleProprietorRegistration',
    indexes: [
      {
        fields: ['userId', 'businessName']
      }
    ]
  });
  
  return SoleProprietorRegistration;
}; 