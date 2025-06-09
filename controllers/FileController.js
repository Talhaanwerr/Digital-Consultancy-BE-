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
      let baseUrl;
      
      // OPTION 1: Use environment variable in production
      if (process.env.NODE_ENV === "production" && process.env.APP_BASE_URL) {
        baseUrl = process.env.APP_BASE_URL;
      } 
      // OPTION 2: If you can't set environment variables, uncomment and edit the next line
      // else if (process.env.NODE_ENV === "production") {
      //   baseUrl = "https://yourdomain.com"; // Replace with your actual domain
      // } 
      else {
        baseUrl = `${req.protocol}://${req.get("host")}`;
      }
      
      // Remove any trailing slashes from the base URL
      baseUrl = baseUrl.replace(/\/+$/, "");
      
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