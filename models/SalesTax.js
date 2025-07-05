'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SalesTax extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define associations here
      SalesTax.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      SalesTax.hasMany(models.SaleInvoice, { 
        foreignKey: 'salesTaxId', 
        as: 'saleInvoices',
        onDelete: 'CASCADE',
        hooks: true
      });
      SalesTax.hasMany(models.ExportInvoice, { 
        foreignKey: 'salesTaxId', 
        as: 'exportInvoices',
        onDelete: 'CASCADE',
        hooks: true
      });
    }
  }
  
  SalesTax.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    taxYear: {
      type: DataTypes.STRING,
      allowNull: false
    },
    taxMonth: {
      type: DataTypes.STRING,
      allowNull: false
    },
    applicationStatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    invoiceStatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    receiptImageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ntnCnicNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ntnCnicPassword: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'SalesTax',
  });
  
  return SalesTax;
}; 