const BaseController = require("./BaseController.js");

class FileController extends BaseController {
  constructor() {
    super();
  }

  // Upload a file
  uploadFile = async (req, res) => {
    try {
      // Check if file was uploaded
      if (!req.file) {
        return this.validationErrorResponse(res, "No file uploaded");
      }

      // Construct the file URL
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const fileUrl = `${baseUrl}/images/${req.file.filename}`;

      return this.successResponse(
        200,
        res,
        { url: fileUrl },
        "File uploaded successfully"
      );
    } catch (error) {
      console.error("Error uploading file:", error);
      return this.serverErrorResponse(res, "Failed to upload file");
    }
  };
}

module.exports = new FileController(); 