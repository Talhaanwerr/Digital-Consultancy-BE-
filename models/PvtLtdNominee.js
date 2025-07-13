'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PvtLtdNominee extends Model {
    static associate(models) {
      PvtLtdNominee.belongsTo(models.PvtLtdRegistration, { 
        foreignKey: 'pvtLtdRegistrationId',
        as: 'registration'
      });
    }
  }
  
  PvtLtdNominee.init({
    pvtLtdRegistrationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
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
    modelName: 'PvtLtdNominee',
  });
  
  return PvtLtdNominee;
}; 