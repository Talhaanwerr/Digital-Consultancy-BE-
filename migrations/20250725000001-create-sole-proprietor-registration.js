"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("SoleProprietorRegistrations", {
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
      businessName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      natureOfBusiness: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      businessAddress: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      cnicFrontUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cnicBackUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      rentAgreementUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      utilityBillUrl: {
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
    
    // Add unique constraint for userId and businessName
    await queryInterface.addIndex("SoleProprietorRegistrations", ["userId", "businessName"], {
      name: "idx_sole_proprietor_user_business_name",
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("SoleProprietorRegistrations");
  },
}; 