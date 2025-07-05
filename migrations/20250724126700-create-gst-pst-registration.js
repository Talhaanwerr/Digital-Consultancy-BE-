'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GstPstRegistrations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
      },
      businessName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      legalStatusOFBusiness: {
        type: Sequelize.STRING,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true
      },
      businessStartDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      businessNature: {
        type: Sequelize.STRING,
        allowNull: true
      },
      electricityConsumerNumber: {
        type: Sequelize.STRING,
        allowNull: true
      },
      bankMaintenanceCertificatePdfUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      latestUtilityBillImageUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      utilityMeterImageUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      letterHeadImageUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      RentAgreementImageUrl: {
        type: Sequelize.STRING,
        allowNull: true
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('GstPstRegistrations');
  }
}; 