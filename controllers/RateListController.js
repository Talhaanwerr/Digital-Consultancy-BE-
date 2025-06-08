const BaseController = require("./BaseController.js");
const RateListRepo = require("../repos/RateListRepo.js");
const RateListValidator = require("../validators/RateListValidator.js");

class RateListController extends BaseController {
  constructor() {
    super();
  }

  // Create a new rate list item
  createRateList = async (req, res) => {
    try {
      const data = { ...req.body };

      // Validate input data
      const validationResult = RateListValidator.validateCreateRateList(data);
      if (!validationResult.status) {
        return this.validationErrorResponse(
          res,
          validationResult?.message || "Invalid data"
        );
      }

      // Create rate list item
      const rateList = await RateListRepo.createRateList(validationResult.data);

      return this.successResponse(
        201,
        res,
        rateList,
        "Rate list item created successfully"
      );
    } catch (error) {
      console.error("Error creating rate list item:", error);
      return this.serverErrorResponse(res, "Failed to create rate list item");
    }
  };

  // Get all rate list items with optional category filter
  getAllRateLists = async (req, res) => {
    try {
      const { category } = req.query;
      let rateLists = [];
      const customQuery = {};

      if (category) {
        customQuery.where = { category };
      }

      rateLists = await RateListRepo.findRateLists(customQuery);

      return this.successResponse(
        200,
        res,
        rateLists,
        "Rate list items retrieved successfully"
      );
    } catch (error) {
      console.error("Error retrieving rate list items:", error);
      return this.serverErrorResponse(
        res,
        "Failed to retrieve rate list items"
      );
    }
  };

  // Get a single rate list item by ID
  getRateListById = async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return this.validationErrorResponse(res, "Rate list ID is required");
      }

      // Find rate list by ID
      const rateList = await RateListRepo.findRateListById(id);

      if (!rateList) {
        return this.errorResponse(404, res, "Rate list item not found");
      }

      return this.successResponse(
        200,
        res,
        rateList,
        "Rate list item retrieved successfully"
      );
    } catch (error) {
      console.error("Error retrieving rate list item:", error);
      return this.serverErrorResponse(res, "Failed to retrieve rate list item");
    }
  };

  // Update a rate list item
  updateRateList = async (req, res) => {
    try {
      const { id } = req.params;
      const data = { ...req.body };

      if (!id) {
        return this.validationErrorResponse(res, "Rate list ID is required");
      }

      // Validate input data
      const validationResult = RateListValidator.validateUpdateRateList(data);
      if (!validationResult.status) {
        return this.validationErrorResponse(
          res,
          validationResult?.message || "Invalid data"
        );
      }

      // Check if rate list exists
      const existingRateList = await RateListRepo.findRateListById(id);
      if (!existingRateList) {
        return this.errorResponse(404, res, "Rate list item not found");
      }

      // Update rate list
      await RateListRepo.updateRateList(id, validationResult.data);

      // Get updated rate list
      const updatedRateList = await RateListRepo.findRateListById(id);

      return this.successResponse(
        200,
        res,
        updatedRateList,
        "Rate list item updated successfully"
      );
    } catch (error) {
      console.error("Error updating rate list item:", error);
      return this.serverErrorResponse(res, "Failed to update rate list item");
    }
  };

  // Delete a rate list item
  deleteRateList = async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return this.validationErrorResponse(res, "Rate list ID is required");
      }

      // Check if rate list exists
      const existingRateList = await RateListRepo.findRateListById(id);
      if (!existingRateList) {
        return this.errorResponse(404, res, "Rate list item not found");
      }

      // Delete rate list
      await RateListRepo.deleteRateList(id);

      return this.successResponse(
        200,
        res,
        { id },
        "Rate list item deleted successfully"
      );
    } catch (error) {
      console.error("Error deleting rate list item:", error);
      return this.serverErrorResponse(res, "Failed to delete rate list item");
    }
  };
}

module.exports = new RateListController();
