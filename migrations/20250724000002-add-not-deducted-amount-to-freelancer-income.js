'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('FreelancerIncomes', 'notDeductedAmount', {
      type: Sequelize.DECIMAL(15, 2),
      allowNull: true,
      defaultValue: 0.00
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('FreelancerIncomes', 'notDeductedAmount');
  }
}; 