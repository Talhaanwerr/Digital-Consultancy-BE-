"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("IndividualTaxReturnFbrInfos", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      individualTaxReturnId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "IndividualTaxReturns",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      isFbrRegistered: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      cnicOrNtnNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      irisPassword: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nicFrontUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nicBackUrl: {
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
    await queryInterface.dropTable("IndividualTaxReturnFbrInfos");
  },
}; 