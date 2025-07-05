'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ExportInvoices', {
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
      salesTaxId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'SalesTaxes',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      invoiceUrls: {
        type: Sequelize.TEXT,
        allowNull: true,
        get() {
          const rawValue = this.getDataValue('invoiceUrls');
          return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
          this.setDataValue('invoiceUrls', JSON.stringify(value));
        }
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
    await queryInterface.dropTable('ExportInvoices');
  }
}; 