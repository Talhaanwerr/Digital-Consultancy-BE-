'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PvtLtdCeo extends Model {
    static associate(models) {
      PvtLtdCeo.belongsTo(models.PvtLtdRegistration, { 
        foreignKey: 'pvtLtdRegistrationId',
        as: 'registration'
      });
    }
  }
  
  PvtLtdCeo.init({
    pvtLtdRegistrationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cellNumber: {
      type: DataTypes.STRING,
      allowNull: true
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
    modelName: 'PvtLtdCeo',
  });
  
  return PvtLtdCeo;
}; 