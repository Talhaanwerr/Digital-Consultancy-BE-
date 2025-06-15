const BaseController = require('./BaseController.js');
const FaqRepo = require('../repos/FaqRepo.js');
const FaqValidator = require('../validators/FaqValidator.js');
const db = require('../models/index.js');
const { Op } = require('sequelize');
const RoleRepo = require('../repos/RoleRepo.js');

class FaqController extends BaseController {
  constructor() {
    super();
  }

  // Get all FAQs with pagination, filtering, and search
  getAllFaqs = async (req, res) => {
    try {
      const {
        page = 1,
        limit = 10,
        search,
        sortBy = 'displayOrder',
        sortOrder = 'ASC',
      } = req.query;

      // Build the query
      const offset = (parseInt(page) - 1) * parseInt(limit);
      const whereClause = {};

      // Add search functionality by question or answer
      if (search) {
        whereClause[Op.or] = [
          { question: { [Op.like]: `%${search}%` } },
          { answer: { [Op.like]: `%${search}%` } },
        ];
      }

      // Execute query with pagination
      const { count, rows: faqs } = await FaqRepo.findAndCountAll({
        where: whereClause,
        order: [[sortBy, sortOrder.toUpperCase()]],
        limit: parseInt(limit),
        offset: offset,
      });

      // Calculate pagination metadata
      const totalPages = Math.ceil(count / parseInt(limit));
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;

      return this.successResponse(
        200,
        res,
        {
          faqs,
          pagination: {
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages,
            hasNextPage,
            hasPrevPage,
          },
        },
        'FAQs retrieved successfully'
      );
    } catch (error) {
      console.error('Error retrieving FAQs:', error);
      return this.serverErrorResponse(res, 'Failed to retrieve FAQs');
    }
  };

  // Get FAQ by ID
  getFaqById = async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return this.validationErrorResponse(res, 'FAQ ID is required');
      }

      const faq = await FaqRepo.findFaqById(id);

      if (!faq) {
        return this.errorResponse(404, res, 'FAQ not found');
      }

      return this.successResponse(200, res, faq, 'FAQ retrieved successfully');
    } catch (error) {
      console.error('Error retrieving FAQ:', error);
      return this.serverErrorResponse(res, 'Failed to retrieve FAQ');
    }
  };

  // Create a new FAQ
  createFaq = async (req, res) => {
    try {
      
      const data = { ...req.body };

      // Validate input data
      const result = FaqValidator.validateFaq(data);
      if (!result.status) {
        return this.validationErrorResponse(
          res,
          result?.message || 'Invalid data'
        );
      }

      // Create new FAQ
      const faq = await FaqRepo.createFaq(result.data);

      return this.successResponse(
        201,
        res,
        faq,
        'FAQ created successfully'
      );
    } catch (error) {
      console.error('Error creating FAQ:', error);
      return this.serverErrorResponse(res, 'Failed to create FAQ');
    }
  };

  // Update an existing FAQ
  updateFaq = async (req, res) => {
    try {
      const { id } = req.params;
      
      if (!id) {
        return this.validationErrorResponse(res, 'FAQ ID is required');
      }

      // Check if FAQ exists
      const existingFaq = await FaqRepo.findFaqById(id);
      if (!existingFaq) {
        return this.errorResponse(404, res, 'FAQ not found');
      }

      const data = { ...req.body };

      // Validate input data
      const result = FaqValidator.validateFaq(data);
      if (!result.status) {
        return this.validationErrorResponse(
          res,
          result?.message || 'Invalid data'
        );
      }

      // Update FAQ
      await FaqRepo.updateFaq(id, result.data);

      const updatedFaq = await FaqRepo.findFaqById(id);

      return this.successResponse(
        200,
        res,
        updatedFaq,
        'FAQ updated successfully'
      );
    } catch (error) {
      console.error('Error updating FAQ:', error);
      return this.serverErrorResponse(res, 'Failed to update FAQ');
    }
  };

  // Delete a FAQ
  deleteFaq = async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return this.validationErrorResponse(res, 'FAQ ID is required');
      }

      // Check if FAQ exists
      const existingFaq = await FaqRepo.findFaqById(id);
      if (!existingFaq) {
        return this.errorResponse(404, res, 'FAQ not found');
      }

      // Delete FAQ
      await FaqRepo.deleteFaq(id);

      return this.successResponse(
        200,
        res,
        { id },
        'FAQ deleted successfully'
      );
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      return this.serverErrorResponse(res, 'Failed to delete FAQ');
    }
  };

}

module.exports = new FaqController(); 