'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BusinessAdditionToNtn extends Model {
    static associate(models) {
      // Define association with User model
      BusinessAdditionToNtn.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE'
      });
    }
  }
  
  BusinessAdditionToNtn.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
    cnicOrNtnNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    irisPassword: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    irisPin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    businessName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    natureOfBusiness: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    businessAddress: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    businessStartDate: {
      type: DataTypes.DATE,
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
    modelName: 'BusinessAdditionToNtn',
    indexes: [
      {
        fields: ['userId', 'businessName']
      }
    ]
  });
  
  return BusinessAdditionToNtn;
}; 