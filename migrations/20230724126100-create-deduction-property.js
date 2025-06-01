'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DeductionProperties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      individualTaxReturnId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'IndividualTaxReturns',
          key: 'id'
        },
      },
      transactionType: {
        type: Sequelize.STRING,
        allowNull: true
      },
      propertyAddress: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      areaValue: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true
      },
      areaUnit: {
        type: Sequelize.STRING,
        allowNull: true
      },
      taxPaidPKR: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DeductionProperties');
  }
}; 