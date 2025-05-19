"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const incomeSourceTypes = [
      { name: "Salary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Business", createdAt: new Date(), updatedAt: new Date() },
      { name: "Pension", createdAt: new Date(), updatedAt: new Date() },
      { name: "Rental", createdAt: new Date(), updatedAt: new Date() },
      { name: "Freelancer", createdAt: new Date(), updatedAt: new Date() },
      { name: "Profession", createdAt: new Date(), updatedAt: new Date() },
      { name: "Profit on Saving", createdAt: new Date(), updatedAt: new Date() },
      { name: "Sale of Property", createdAt: new Date(), updatedAt: new Date() },
      { name: "Agriculture Income", createdAt: new Date(), updatedAt: new Date() },
      { name: "Commision Income", createdAt: new Date(), updatedAt: new Date() },
      { name: "Partnership/ AOP", createdAt: new Date(), updatedAt: new Date() },
      { name: "Dividend Income/ Capital Gain", createdAt: new Date(), updatedAt: new Date() },
      { name: "Other Income", createdAt: new Date(), updatedAt: new Date() }
    ];

    return queryInterface.bulkInsert("IncomeSourceTypes", incomeSourceTypes);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete("IncomeSourceTypes", null, {});
  }
}; 