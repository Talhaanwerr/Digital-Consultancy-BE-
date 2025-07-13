"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("LlpRegistrations", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      preferredName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      secondName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      thirdName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      totalInvestmentPKR: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,
      },
      companyAddress: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      applicationStatus: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      invoiceStatus: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      receiptImageUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("LlpRegistrations");
  },
}; 