const BaseRepository = require("./BaseRepo");
const { SaleInvoice } = require("../models");

class SaleInvoiceRepo extends BaseRepository {
  constructor() {
    super(SaleInvoice);
  }

  async findBySalesTaxId(salesTaxId) {
    return this.findAll({
      where: { salesTaxId }
    });
  }

  async createForSalesTax(salesTaxId, userId, invoiceUrls) {
    if (!invoiceUrls || !Array.isArray(invoiceUrls) || invoiceUrls.length === 0) {
      return null;
    }

    return this.create({
      salesTaxId,
      userId,
      invoiceUrls
    });
  }

  async updateForSalesTax(id, invoiceUrls) {
    if (!invoiceUrls || !Array.isArray(invoiceUrls)) {
      return null;
    }

    await this.update({ invoiceUrls }, { where: { id } });
    return this.findOne({ where: { id } });
  }

  async deleteAllForSalesTax(salesTaxId) {
    return this.delete({
      where: { salesTaxId }
    });
  }
}

module.exports = new SaleInvoiceRepo(); 