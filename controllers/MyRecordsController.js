const BaseController = require('./BaseController');
const MyRecordsService = require('../services/MyRecordsService');

class MyRecordsController extends BaseController {
  constructor() {
    super();
  }

  /**
   * Get all records for the authenticated user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  getAllRecords = async (req, res) => {
    try {
      // Get user ID from the JWT token (set by auth middleware)
      const userId = req.user.id;
      
      if (!userId) {
        return this.errorResponse(401, res, 'User not authenticated');
      }
      
      // Get all records from the service
      const records = await MyRecordsService.getAllRecords(userId);
      
      // Return success response with data
      return this.successResponse(200, res, records, 'Records retrieved successfully');
    } catch (error) {
      console.error('Error in MyRecordsController.getAllRecords:', error);
      return this.serverErrorResponse(res, 'Failed to retrieve records');
    }
  }
}

module.exports = new MyRecordsController(); 