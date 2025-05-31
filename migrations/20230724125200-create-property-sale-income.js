'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PropertySaleIncomes', {
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
      propertyType: {
        type: Sequelize.STRING,
        allowNull: true
      },
      purchaseDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      saleDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      purchasePricePKR: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true
      },
      salePricePKR: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true
      },
      propertyAddress: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      advanceTaxChallanUrl: {
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.dropTable('PropertySaleIncomes');
  }
}; 