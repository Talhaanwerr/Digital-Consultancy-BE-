'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BusinessDeletionFromNtn extends Model {
    static associate(models) {
      // Define association with User model
      BusinessDeletionFromNtn.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE'
      });
    }
  }
  
  BusinessDeletionFromNtn.init({
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
      allowNull: false,
    },
    irisPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    irisPin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    businessName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    businessDeletionDate: {
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
    modelName: 'BusinessDeletionFromNtn',
    indexes: [
      {
        fields: ['userId', 'businessName']
      }
    ]
  });
  
  return BusinessDeletionFromNtn;
}; 