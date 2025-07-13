'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PvtLtdRegistrations', {
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
      isSingleDirector: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      preferredName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      secondName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      thirdName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      authorizedCapitalPKR: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true
      },
      companyAddress: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      applicationStatus: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      invoiceStatus: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      receiptImageUrl: {
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PvtLtdRegistrations');
  }
}; 