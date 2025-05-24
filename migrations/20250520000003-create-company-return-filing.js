"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("CompanyReturnFilings", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      taxYear: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      businessNature: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      businessType: {
        type: Sequelize.STRING,
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
      bankStatementPdfUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      financialStatementPdfUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
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
    
    // Add unique constraint for userId and taxYear
    await queryInterface.addIndex("CompanyReturnFilings", ["userId", "taxYear"], {
      unique: true,
      name: "idx_company_returns_user_tax_year",
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("CompanyReturnFilings");
  },
}; 