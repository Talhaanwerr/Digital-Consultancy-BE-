'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('WealthStatements', {
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
      opening: {
        type: Sequelize.JSON,
        allowNull: true
      },
      assets: {
        type: Sequelize.JSON,
        allowNull: true
      },
      liabilities: {
        type: Sequelize.JSON,
        allowNull: true
      },
      expense: {
        type: Sequelize.JSON,
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
    await queryInterface.dropTable('WealthStatements');
  }
}; 