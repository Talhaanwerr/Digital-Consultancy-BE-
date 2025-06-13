'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProfessionIncomes', {
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
      profession: {
        type: Sequelize.STRING,
        allowNull: true
      },
      professionRevenueJson: {
        type: Sequelize.JSON,
        allowNull: true
      },
      expenseSheetJson: {
        type: Sequelize.JSON,
        allowNull: true
      },
      balanceSheetJson: {
        type: Sequelize.JSON,
        allowNull: true
      },
      otherAdjustableTaxJson: {
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
    await queryInterface.dropTable('ProfessionIncomes');
  }
}; 