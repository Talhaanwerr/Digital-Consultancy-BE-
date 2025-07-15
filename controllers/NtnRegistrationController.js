const BaseController = require("./BaseController");
const NtnRegistrationRepo = require("../repos/NtnRegistrationRepo");
const NtnRegistrationValidator = require("../validators/NtnRegistrationValidator");

class NtnRegistrationController extends BaseController {
  constructor() {
    super();
  }

  createOrUpdateNtnRegistration = async (req, res) => {
    try {
      // Add userId from authenticated user
      const data = { ...req.body, userId: req.user.id };

      // Validate request data
      const validationResult = NtnRegistrationValidator.validateCreate(data);
      if (!validationResult.status) {
        return this.validationErrorResponse(res, validationResult.message);
      }

      // Check if a registration already exists for this user, telecom, and email
      const existingRegistration =
        await NtnRegistrationRepo.findByUserIdAndTelecom(
          req.user.id,
          validationResult.data.telecom || "",
          validationResult.data.email || ""
        );

      let result;

      if (existingRegistration) {
        // Update existing registration
        await NtnRegistrationRepo.update(validationResult.data, {
          where: { id: existingRegistration.id },
        });

        // Fetch the updated record
        const result = await NtnRegistrationRepo.findByIdWithUser(
          existingRegistration.id
        );
      } else {
        // Create new registration
        result = await NtnRegistrationRepo.create(validationResult.data);
      }
      return this.successResponse(
        201,
        res,
        result,
        "NTN registration created successfully"
      );
    } catch (error) {
      console.error("Error in createOrUpdateNtnRegistration:", error);
      return this.serverErrorResponse(
        res,
        "Failed to process NTN registration"
      );
    }
  };

  getNtnRegistrations = async (req, res) => {
    try {
      const userId = req.user.id;
      const filters = {
        applicationStatus: req.query.status,
        telecom: req.query.telecom,
        invoiceStatus: req.query.invoiceStatus,
      };

      // Remove undefined filters
      Object.keys(filters).forEach((key) => {
        if (filters[key] === undefined) {
          delete filters[key];
        }
      });

      const registrations = await NtnRegistrationRepo.findByUserId(
        userId,
        filters
      );

      return this.successResponse(
        200,
        res,
        registrations,
        "NTN registrations retrieved successfully"
      );
    } catch (error) {
      console.error("Error in getNtnRegistrations:", error);
      return this.serverErrorResponse(
        res,
        "Failed to retrieve NTN registrations"
      );
    }
  };

  getNtnRegistrationById = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const registration = await NtnRegistrationRepo.findByIdWithUser(
        id,
        userId
      );

      if (!registration) {
        return this.errorResponse(404, res, "NTN registration not found");
      }

      return this.successResponse(
        200,
        res,
        registration,
        "NTN registration retrieved successfully"
      );
    } catch (error) {
      console.error("Error in getNtnRegistrationById:", error);
      return this.serverErrorResponse(
        res,
        "Failed to retrieve NTN registration"
      );
    }
  };

  updateNtnRegistration = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      // Check if the registration exists and belongs to the user
      const existingRegistration = await NtnRegistrationRepo.findByIdWithUser(
        id,
        userId
      );

      if (!existingRegistration) {
        return this.errorResponse(404, res, "NTN registration not found");
      }

      // Validate request data
      const validationResult = NtnRegistrationValidator.validateUpdate(
        req.body
      );
      if (!validationResult.status) {
        return this.validationErrorResponse(res, validationResult.message);
      }

      // Update the registration
      await NtnRegistrationRepo.update(validationResult.data, {
        where: { id },
      });

      // Fetch the updated record
      const updatedRegistration = await NtnRegistrationRepo.findByIdWithUser(
        id
      );

      return this.successResponse(
        200,
        res,
        updatedRegistration,
        "NTN registration updated successfully"
      );
    } catch (error) {
      console.error("Error in updateNtnRegistration:", error);
      return this.serverErrorResponse(res, "Failed to update NTN registration");
    }
  };
}

module.exports = new NtnRegistrationController();
