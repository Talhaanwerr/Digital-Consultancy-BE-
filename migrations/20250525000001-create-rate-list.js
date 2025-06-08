'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('RateLists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING(120),
        allowNull: false
      },
      time: {
        type: Sequelize.STRING(80),
        allowNull: true
      },
      category: {
        type: Sequelize.STRING(80),
        allowNull: true
      },
      price: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true
      },
      requirements: {
        type: Sequelize.JSON,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('RateLists');
  }
}; 