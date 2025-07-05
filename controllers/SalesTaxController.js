const BaseController = require("./BaseController");
const SalesTaxRepo = require("../repos/SalesTaxRepo");
const SaleInvoiceRepo = require("../repos/SaleInvoiceRepo");
const ExportInvoiceRepo = require("../repos/ExportInvoiceRepo");
const SalesTaxValidator = require("../validators/SalesTaxValidator");
const { sequelize } = require("../models");

class SalesTaxController extends BaseController {
  constructor() {
    super();
  }
  createOrUpdateSalesTax = async (req, res) => {
    try {
      // Add userId from authenticated user
      const data = { ...req.body, userId: req.user.id };
      
      // Validate request data
      const validationResult = SalesTaxValidator.validateCreate(data);
      if (!validationResult.status) {
        return this.validationErrorResponse(res, validationResult.message);
      }
      
      const { saleInvoices, exportInvoices, ...salesTaxData } = validationResult.data;
      
      // Use a transaction to ensure data integrity
      const result = await sequelize.transaction(async (t) => {
        // Create or update sales tax record
        const salesTax = await SalesTaxRepo.createOrUpdate(salesTaxData);
        
        // Handle sale invoices
        if (saleInvoices) {
          // Check if there's an existing sale invoice record
          const existingSaleInvoices = await SaleInvoiceRepo.findBySalesTaxId(salesTax.id);
          
          if (existingSaleInvoices && existingSaleInvoices.length > 0) {
            // Update existing record
            await SaleInvoiceRepo.updateForSalesTax(existingSaleInvoices[0].id, saleInvoices.invoiceUrls);
          } else {
            // Create new record
            await SaleInvoiceRepo.createForSalesTax(salesTax.id, req.user.id, saleInvoices.invoiceUrls);
          }
        }
        
        // Handle export invoices
        if (exportInvoices) {
          // Check if there's an existing export invoice record
          const existingExportInvoices = await ExportInvoiceRepo.findBySalesTaxId(salesTax.id);
          
          if (existingExportInvoices && existingExportInvoices.length > 0) {
            // Update existing record
            await ExportInvoiceRepo.updateForSalesTax(existingExportInvoices[0].id, exportInvoices.invoiceUrls);
          } else {
            // Create new record
            await ExportInvoiceRepo.createForSalesTax(salesTax.id, req.user.id, exportInvoices.invoiceUrls);
          }
        }
        
        // Return the updated record with all related data
        return SalesTaxRepo.findByIdWithInvoices(salesTax.id);
      });
      
      return this.successResponse(
        201,
        res,
        result,
        "Sales tax filing created/updated successfully"
      );
    } catch (error) {
      console.error("Error in createOrUpdateSalesTax:", error);
      return this.serverErrorResponse(res, "Failed to create/update sales tax filing");
    }
  }

  getSalesTaxFilings = async (req, res) => {
    try {
      const { year, month } = req.query;
      const userId = req.user.id;
      
      const filters = {};
      if (year) filters.taxYear = year;
      if (month) filters.taxMonth = month;
      
      const salesTaxFilings = await SalesTaxRepo.findByUserId(userId, filters);
      
      return this.successResponse(
        200,
        res,
        salesTaxFilings,
        "Sales tax filings retrieved successfully"
      );
    } catch (error) {
      console.error("Error in getSalesTaxFilings:", error);
      return this.serverErrorResponse(res, "Failed to retrieve sales tax filings");
    }
  }

  getSalesTaxFilingById = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      
      const salesTaxFiling = await SalesTaxRepo.findByIdWithInvoices(id, userId);
      
      if (!salesTaxFiling) {
        return this.errorResponse(404, res, "Sales tax filing not found");
      }
      
      return this.successResponse(
        200,
        res,
        salesTaxFiling,
        "Sales tax filing retrieved successfully"
      );
    } catch (error) {
      console.error("Error in getSalesTaxFilingById:", error);
      return this.serverErrorResponse(res, "Failed to retrieve sales tax filing");
    }
  }

  updateSalesTaxFiling = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      
      // Check if the sales tax filing exists and belongs to the user
      const existingSalesTax = await SalesTaxRepo.findByIdWithInvoices(id, userId);
      
      if (!existingSalesTax) {
        return this.errorResponse(404, res, "Sales tax filing not found");
      }
      
      // Validate request data
      const validationResult = SalesTaxValidator.validateUpdate(req.body);
      if (!validationResult.status) {
        return this.validationErrorResponse(res, validationResult.message);
      }
      
      const { saleInvoices, exportInvoices, ...salesTaxData } = validationResult.data;
      
      // Use a transaction to ensure data integrity
      const result = await sequelize.transaction(async (t) => {
        // Update sales tax record
        if (Object.keys(salesTaxData).length > 0) {
          await SalesTaxRepo.update(salesTaxData, { where: { id } });
        }
        
        // Handle sale invoices
        if (saleInvoices) {
          // Check if there's an existing sale invoice record
          const existingSaleInvoices = await SaleInvoiceRepo.findBySalesTaxId(id);
          
          if (existingSaleInvoices && existingSaleInvoices.length > 0) {
            // Update existing record
            await SaleInvoiceRepo.updateForSalesTax(existingSaleInvoices[0].id, saleInvoices.invoiceUrls);
          } else {
            // Create new record
            await SaleInvoiceRepo.createForSalesTax(id, userId, saleInvoices.invoiceUrls);
          }
        }
        
        // Handle export invoices
        if (exportInvoices) {
          // Check if there's an existing export invoice record
          const existingExportInvoices = await ExportInvoiceRepo.findBySalesTaxId(id);
          
          if (existingExportInvoices && existingExportInvoices.length > 0) {
            // Update existing record
            await ExportInvoiceRepo.updateForSalesTax(existingExportInvoices[0].id, exportInvoices.invoiceUrls);
          } else {
            // Create new record
            await ExportInvoiceRepo.createForSalesTax(id, userId, exportInvoices.invoiceUrls);
          }
        }
        
        // Return the updated record with all related data
        return SalesTaxRepo.findByIdWithInvoices(id);
      });
      
      return this.successResponse(
        200,
        res,
        result,
        "Sales tax filing updated successfully"
      );
    } catch (error) {
      console.error("Error in updateSalesTaxFiling:", error);
      return this.serverErrorResponse(res, "Failed to update sales tax filing");
    }
  }
}

module.exports = new SalesTaxController(); 