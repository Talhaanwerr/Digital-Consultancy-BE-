'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CommissionIncomes', {
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
        }
      },
      lifeInsuranceAgentJson: {
        type: Sequelize.JSON,
        allowNull: true
      },
      generalInsuranceAgentJson: {
        type: Sequelize.JSON,
        allowNull: true
      },
      realEstateTravelAgentJson: {
        type: Sequelize.JSON,
        allowNull: true
      },
      otherCommissionJson: {
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
    await queryInterface.dropTable('CommissionIncomes');
  }
}; 