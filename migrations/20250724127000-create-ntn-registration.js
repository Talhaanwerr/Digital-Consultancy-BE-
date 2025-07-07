'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('NtnRegistrations', {
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
      telecom: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cnicFrontUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cnicBackUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      phone: {
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
      email: {
        type: Sequelize.STRING,
        allowNull: true
      },
      irisCnicNo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      irisCnicPassword: {
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
    await queryInterface.dropTable('NtnRegistrations');
  }
}; 