'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class NtnRegistration extends Model {
    static associate(models) {
      // Define association with User model
      NtnRegistration.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }
  
  NtnRegistration.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    telecom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cnicFrontUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cnicBackUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    applicationStatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    invoiceStatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    receiptImageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    irisCnicNo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    irisCnicPassword: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'NtnRegistration',
  });
  
  return NtnRegistration;
}; 