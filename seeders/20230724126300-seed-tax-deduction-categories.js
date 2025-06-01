'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('TaxDeductionCategories', [
      {
        name: 'Bank Transactions',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vehicle Tax Paid Yearly',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Utilities Tax',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Property',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Others',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TaxDeductionCategories', null, {});
  }
}; 