'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PvtLtdRegistration extends Model {
    static associate(models) {
      PvtLtdRegistration.belongsTo(models.User, { 
        foreignKey: 'userId',
        as: 'user'
      });
      
      PvtLtdRegistration.hasMany(models.PvtLtdDirector, { 
        foreignKey: 'pvtLtdRegistrationId',
        as: 'directors',
        onDelete: 'CASCADE'
      });
      
      PvtLtdRegistration.hasOne(models.PvtLtdNominee, { 
        foreignKey: 'pvtLtdRegistrationId',
        as: 'nominee',
        onDelete: 'CASCADE'
      });
      
      PvtLtdRegistration.hasOne(models.PvtLtdCeo, { 
        foreignKey: 'pvtLtdRegistrationId',
        as: 'ceo',
        onDelete: 'CASCADE'
      });
    }
  }
  
  PvtLtdRegistration.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isSingleDirector: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
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
    authorizedCapitalPKR: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    },
    companyAddress: {
      type: DataTypes.TEXT,
      allowNull: true
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
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'PvtLtdRegistration',
  });
  
  return PvtLtdRegistration;
}; 