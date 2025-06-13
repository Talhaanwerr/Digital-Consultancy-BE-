'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DividendCapitalGainIncomes', {
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
      dividendIncomeJson: {
        type: Sequelize.JSON,
        allowNull: true
      },
      capitalGainJson: {
        type: Sequelize.JSON,
        allowNull: true
      },
      nccplStatementUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      mutualFundsReportUrl: {
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
    await queryInterface.dropTable('DividendCapitalGainIncomes');
  }
}; 