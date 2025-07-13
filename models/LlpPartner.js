'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LlpPartner extends Model {
    static associate(models) {
      // Define association with LlpRegistration model
      LlpPartner.belongsTo(models.LlpRegistration, {
        foreignKey: 'llpRegistrationId',
        as: 'llpRegistration',
        onDelete: 'CASCADE'
      });
    }
  }
  
  LlpPartner.init({
    llpRegistrationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "LlpRegistration",
        key: "id",
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cellNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cnicFrontUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cnicBackUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'LlpPartner',
  });
  
  return LlpPartner;
}; 