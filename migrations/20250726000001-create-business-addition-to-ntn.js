"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("BusinessAdditionToNtns", {
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
      cnicOrNtnNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      irisPassword: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      irisPin: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      businessName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      natureOfBusiness: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      businessAddress: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      businessStartDate: {
        type: Sequelize.DATE,
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
    
    // Add index for userId and businessName
    await queryInterface.addIndex("BusinessAdditionToNtns", ["userId", "businessName"], {
      name: "idx_business_addition_ntn_user_business_name",
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("BusinessAdditionToNtns");
  },
}; 