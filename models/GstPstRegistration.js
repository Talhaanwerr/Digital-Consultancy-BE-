'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class GstPstRegistration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define associations here
      GstPstRegistration.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      GstPstRegistration.hasMany(models.GpsTaggedPhoto, { 
        foreignKey: 'gstPstRegistrationId', 
        as: 'gpsTaggedPhotos',
        onDelete: 'CASCADE',
        hooks: true
      });
      GstPstRegistration.hasMany(models.GstPstCnic, { 
        foreignKey: 'gstPstRegistrationId', 
        as: 'gstPstCnics',
        onDelete: 'CASCADE',
        hooks: true
      });
    }
  }
  
  GstPstRegistration.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    businessName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    legalStatusOFBusiness: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    businessStartDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    businessNature: {
      type: DataTypes.STRING,
      allowNull: true
    },
    electricityConsumerNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bankMaintenanceCertificatePdfUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    latestUtilityBillImageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    utilityMeterImageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    letterHeadImageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    RentAgreementImageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    applicationStatus: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'requested'
    },
    invoiceStatus: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'unpaid'
    },
    receiptImageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'GstPstRegistration',
  });
  
  return GstPstRegistration;
}; 