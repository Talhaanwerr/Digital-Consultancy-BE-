'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AopPartner extends Model {
    static associate(models) {
      AopPartner.belongsTo(models.AopRegistration, { 
        foreignKey: 'aopRegistrationId'
      });
    }
  }
  
  AopPartner.init({
    aopRegistrationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cellNumber: {
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
    }
  }, {
    sequelize,
    modelName: 'AopPartner',
  });
  
  return AopPartner;
}; 