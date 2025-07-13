'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LlpRegistration extends Model {
    static associate(models) {
      // Define association with User model
      LlpRegistration.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE'
      });
      
      // Define association with LlpPartner model
      LlpRegistration.hasMany(models.LlpPartner, {
        foreignKey: 'llpRegistrationId',
        as: 'partners',
        onDelete: 'CASCADE'
      });
    }
  }
  
  LlpRegistration.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
    preferredName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    secondName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    thirdName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    totalInvestmentPKR: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    companyAddress: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    applicationStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    invoiceStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    receiptImageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'LlpRegistration',
  });
  
  return LlpRegistration;
}; 