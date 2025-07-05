'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SalesTaxes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
      },
      taxYear: {
        type: Sequelize.STRING,
        allowNull: true
      },
      taxMonth: {
        type: Sequelize.STRING,
        allowNull: true
      },
      applicationStatus: {
        type: Sequelize.STRING,
        allowNull: true
      },
      invoiceStatus: {
        type: Sequelize.STRING,
        allowNull: true
      },
      receiptImageUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ntnCnicNumber: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ntnCnicPassword: {
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
    await queryInterface.dropTable('SalesTaxes');
  }
}; 