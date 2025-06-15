'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Faq extends Model {
    static associate(models) {
      // define associations here
    }
  }
  
  Faq.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      question: {
        type: DataTypes.STRING(500),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      answer: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      displayOrder: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Faq',
      tableName: 'faqs',
      timestamps: true,
    }
  );
  
  return Faq;
}; 