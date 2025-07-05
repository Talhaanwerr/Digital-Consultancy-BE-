'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SaleInvoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define associations here
      SaleInvoice.belongsTo(models.SalesTax, { foreignKey: 'salesTaxId', as: 'salesTax' });
      SaleInvoice.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  
  SaleInvoice.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    salesTaxId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    invoiceUrls: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue('invoiceUrls');
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue('invoiceUrls', JSON.stringify(value));
      }
    }
  }, {
    sequelize,
    modelName: 'SaleInvoice',
  });
  
  return SaleInvoice;
}; 