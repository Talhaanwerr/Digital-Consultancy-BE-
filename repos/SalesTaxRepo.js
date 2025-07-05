const BaseRepository = require("./BaseRepo");
const { SalesTax, SaleInvoice, ExportInvoice, User } = require("../models");

class SalesTaxRepo extends BaseRepository {
  constructor() {
    super(SalesTax);
  }

  async findByUserYearMonth(userId, taxYear, taxMonth) {
    return this.findOne({
      where: { userId, taxYear, taxMonth },
      include: [
        { model: SaleInvoice, as: 'saleInvoices' },
        { model: ExportInvoice, as: 'exportInvoices' }
      ]
    });
  }

  async findByIdWithInvoices(id, userId = null) {
    const whereClause = { id };
    if (userId) {
      whereClause.userId = userId;
    }

    return this.findOne({
      where: whereClause,
      include: [
        { model: SaleInvoice, as: 'saleInvoices' },
        { model: ExportInvoice, as: 'exportInvoices' },
        { model: User, as: 'user', attributes: ['id', 'firstName', 'lastName', 'email'] }
      ]
    });
  }

  async findByUserId(userId, filters = {}) {
    const whereClause = { userId };
    
    if (filters.taxYear) {
      whereClause.taxYear = filters.taxYear;
    }
    
    if (filters.taxMonth) {
      whereClause.taxMonth = filters.taxMonth;
    }

    return this.findAll({
      where: whereClause,
      include: [
        { model: User, as: 'user', attributes: ['id', 'firstName', 'lastName', 'email'] }
      ],
      order: [['taxYear', 'DESC'], ['taxMonth', 'DESC']]
    });
  }

  async createOrUpdate(data) {
    const { userId, taxYear, taxMonth } = data;
    
    // Check if a record already exists for this user, year, and month
    const existingRecord = await this.findByUserYearMonth(userId, taxYear, taxMonth);
    
    if (existingRecord) {
      // Update existing record
      await this.update({ ...data }, { where: { id: existingRecord.id } });
      return this.findByIdWithInvoices(existingRecord.id);
    } else {
      // Create new record
      const newRecord = await this.create(data);
      return this.findByIdWithInvoices(newRecord.id);
    }
  }
}

module.exports = new SalesTaxRepo(); 