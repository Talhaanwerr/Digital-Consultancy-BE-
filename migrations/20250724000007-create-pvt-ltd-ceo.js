'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PvtLtdCeos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pvtLtdRegistrationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'PvtLtdRegistrations',
          key: 'id'
        },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cellNumber: {
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
    await queryInterface.dropTable('PvtLtdCeos');
  }
}; 