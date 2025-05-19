"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("IndividualTaxReturns", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      filingFor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      taxYear: {
        type: Sequelize.STRING,
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
      status: {
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

    // Add unique constraint for userId and taxYear
    await queryInterface.addIndex("IndividualTaxReturns", ["userId", "taxYear"], {
      unique: true,
      name: "idx_user_tax_year_unique",
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("IndividualTaxReturns");
  },
}; 