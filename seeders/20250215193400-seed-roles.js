"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert("Roles", [
      { name: "Super Admin", createdAt: new Date(), updatedAt: new Date() },
      { name: "Admin", createdAt: new Date(), updatedAt: new Date() },
      { name: "User", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete("Roles", null, {});
  },
};
