'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PvtLtdDirector extends Model {
    static associate(models) {
      PvtLtdDirector.belongsTo(models.PvtLtdRegistration, { 
        foreignKey: 'pvtLtdRegistrationId',
        as: 'registration'
      });
    }
  }
  
  PvtLtdDirector.init({
    pvtLtdRegistrationId: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    modelName: 'PvtLtdDirector',
  });
  
  return PvtLtdDirector;
}; 