"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Get the admin role ID
    const adminRole = await queryInterface.sequelize.query(
      `SELECT id FROM Roles WHERE name = 'Super Admin' LIMIT 1`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    
    const roleId = adminRole[0]?.id;
    
    if (!roleId) {
      console.error("Super Admin role not found. Please run the roles seeder first.");
      return;
    }
    
    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync("admin123", salt);
    
    return queryInterface.bulkInsert("Users", [
      {
        firstName: "Super",
        lastName: "Admin",
        username: "super_admin",
        email: "super_admin@example.com",
        phone: "+923421234567",
        password: hashedPassword,
        roleId: roleId,
        status: "active",
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete("Users", { email: "super_admin@example.com" }, {});
  }
}; 