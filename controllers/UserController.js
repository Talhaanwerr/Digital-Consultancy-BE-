const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const BaseController = require("./BaseController.js");
const UserRepo = require("../repos/UserRepo.js");
const { ROLES } = require("../constants/constants.js");
const UserValidator = require("../validators/UserValidator.js");
const RoleRepo = require("../repos/RoleRepo.js");
const sendMail = require("../utils/mailer.js");
const db = require("../models/index.js");

class UserController extends BaseController {
  constructor() {
    super();
  }

  registerUser = async (req, res) => {
    const result = UserValidator.validateRegisterUser(req.body);
    if (!result.status) {
      return this.validationErrorResponse(
        res,
        result?.message || "Invalid data"
      );
    }

    const { firstName, lastName, phone, email, cnic, password } = result.data;

    const existingUser = await UserRepo.findUser({
      where: { email },
    });
    if (existingUser) {
      return this.errorResponse(
        400,
        res,
        "User already exists with this email"
      );
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const salt = bcrypt.genSaltSync(saltRounds);

    const [hashedPassword, userRole] = await Promise.all([
      bcrypt.hash(password, salt),
      RoleRepo.findRole({
        where: {
          name: ROLES.USER,
        },
      }),
    ]);

    // ✅ Generate 4-digit OTP
    const otp = "0000"///Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpiresAt = new Date(Date.now() + 1 * 60 * 1000); // 1 min expiry

    const user = await UserRepo.createUser({
      firstName,
      lastName,
      phone,
      email,
      cnic,
      password: hashedPassword,
      roleId: userRole.id,
      otp,
      otpExpiresAt,
      status: "active",
      emailVerified: false,
    });

    // const expiresIn = rememberMe ? "30d" : "1d";

    delete user.dataValues.password;
    delete user.dataValues.otp;
    delete user.dataValues.otpExpiresAt;

    // const tokenObj = {
    //   id: user.id,
    //   firstName: user.firstName,
    //   lastName: user.lastName,
    //   phone: user?.phone || "",
    //   email: user.email,
    //   roleId: user.roleId,
    // };

    // const token = jwt.sign(tokenObj, process.env.SECRET_KEY, {
    //   expiresIn,
    // });

    // if (rememberMe) {
    //   user.rememberToken = token;
    //   await user.save();
    // }

    const emailData = {
      email,
      subject: "Your OTP Verification Code",
      text: `Your OTP code is: ${otp}. It will expire in 1 minutes.`,
    };

    // await sendMail(emailData.email, emailData.subject, emailData.text);

    return this.successResponse(
      201,
      res,
      { user },
      "User registered successfully and OTP sent to your email."
    );
  };

  //*******Login************

  loginUser = async (req, res) => {
    const result = UserValidator.validateLoginUser(req.body);

    if (!result.status) {
      return this.validationErrorResponse(
        res,
        result?.message || "Invalid credentials"
      );
    }

    const { email, password } = result.data;

    const expiresIn = "1d" //rememberMe ? "30d" : "1d";

    const user = await UserRepo.findUser({
      where: { email },
    });

    if (!user) {
      return this.errorResponse(401, res, "Invalid Credentials");
    }

    // Check if email is verified
    if (!user.emailVerified) {
      return this.errorResponse(
        403,
        res,
        "Email not verified. Please verify your email before logging in.",
        {
          resendOtpAvailable: true,
        }
      );
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return this.errorResponse(401, res, "Invalid credentials");
    }

    const tokenObj = {
      id: user.id,
      email: user.email,
      username: user?.username || "",
      phone: user.phone,
      roleId: user.roleId,
      isEmailVerified: user.emailVerified,
    };

    const token = jwt.sign(tokenObj, process.env.SECRET_KEY, {
      expiresIn,
    });

    // Store the token in the user record if rememberMe is true
    // if (rememberMe) {
    //   user.rememberToken = token;
    //   await user.save();
    // }

    delete user.dataValues.password;

    return this.successResponse(200, res, { user, token }, "Login successful");
  };

  // ********************** FORGOT PASSWORD **********************
  forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return this.validationErrorResponse(res, "Email is required");
      }

      const user = await UserRepo.findUser({ where: { email } });
      if (!user) {
        return this.errorResponse(401, res, "User not found");
      }

      // Check if email is verified
      if (!user.emailVerified) {
        return this.errorResponse(
          403,
          res,
          "Email not verified. Please verify your email before resetting the password.",
          {
            resendOtpAvailable: true,
          }
        );
      }

      // Generate a reset code valid for 1 minutes
      const otp = "0000"//Math.floor(1000 + Math.random() * 9000).toString();
      const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 1 min expiry

      user.otp = otp;
      user.otpExpiresAt = otpExpiresAt;
      await user.save();

      const emailData = {
        email,
        subject: "Password Reset Request: Your OTP Verification Code",
        text: `Your OTP code is: ${otp}. It will expire in 1 minutes.`,
      };

      // await sendMail(emailData.email, emailData.subject, emailData.text);

      return this.successResponse(
        200,
        res,
        {},
        "An OTP has been sent to your email"
      );
    } catch (error) {
      console.error(error);
      return this.errorResponse(
        500,
        res,
        "An error occurred while processing the request"
      );
    }
  };

  // ********************** RESET PASSWORD **********************
  resetPassword = async (req, res) => {
    const { email } = req.query;
    const { newPassword } = req.body;

    if (!email || !newPassword) {
      return this.validationErrorResponse(
        res,
        "email and password are required"
      );
    }

    // Verify token
    try {
      // const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const user = await UserRepo.findUser({ where: { email } });

      if (!user) {
        return this.errorResponse(400, res, "User not found");
      }

      // Hash the new password
      const saltRounds = parseInt(process.env.SALT_ROUNDS);
      const salt = bcrypt.genSaltSync(saltRounds);
      user.password = await bcrypt.hash(newPassword, salt);
      user.otp = null;
      user.otpExpiresAt = null;
      await user.save();

      delete user.dataValues.password;

      return this.successResponse(200, res, {}, "Password reset successfully");
    } catch (error) {
      return this.errorResponse(400, res, "Something went wrong");
    }
  };

  //******************OTP Verification***************** */
  verifyOtp = async (req, res) => {
    const { otp, email } = req.body;

    if (!email || !otp) {
      return this.validationErrorResponse(res, "Email and OTP are required.");
    }

    const user = await UserRepo.findUser({ where: { email } });

    if (!user) {
      return this.errorResponse(404, res, "User not found.");
    }

    const now = new Date();

    if (
      user.otp !== otp ||
      !user.otpExpiresAt ||
      now > new Date(user.otpExpiresAt)
    ) {
      return this.errorResponse(400, res, "Invalid or expired OTP.");
    }

    // ✅ OTP is valid, clear it from DB and set emailVerified to true
    user.otp = null;
    user.otpExpiresAt = null;
    user.emailVerified = true;
    await user.save();

    return this.successResponse(200, res, null, "OTP verified successfully.");
  };

  
  resendOtp = async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return this.validationErrorResponse(res, "Email is required");
      }

      const user = await UserRepo.findUser({ where: { email } });
      if (!user) {
        return this.errorResponse(404, res, "User not found");
      }

      // Generate a new OTP code valid for 1 minute
      const otp = "0000"//Math.floor(1000 + Math.random() * 9000).toString();
      const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 1 min expiry

      user.otp = otp;
      user.otpExpiresAt = otpExpiresAt;
      await user.save();

      const emailData = {
        email,
        subject: "Your New OTP Verification Code",
        text: `Your new OTP code is: ${otp}. It will expire in 1 minute.`,
      };

      // await sendMail(emailData.email, emailData.subject, emailData.text);

      return this.successResponse(
        200,
        res,
        {},
        "A new OTP has been sent to your email"
      );
    } catch (error) {
      console.error("Error resending OTP:", error);
      return this.serverErrorResponse(res, "Failed to resend OTP");
    }
  };

  adminLogin = async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validate request
      if (!email || !password) {
        return this.validationErrorResponse(
          res,
          "Email and password are required"
        );
      }

      // get Admin role
      const adminRole = await RoleRepo.findRole({
        where: {
          name: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
        },
      });

      // Find user by email
      const user = await UserRepo.findUser({
        where: {
          email,
          emailVerified: true,
          roleId: adminRole.id,
        },
        include: [
          {
            model: db.Role,
            as: "role",
            attributes: ["id", "name"],
          },
        ],
      });

      if (!user) {
        return this.errorResponse(401, res, "Invalid credentials");
      }

      // Check if user has admin role
      if (
        !user.role ||
        (user.role.name !== ROLES.ADMIN && user.role.name !== ROLES.SUPER_ADMIN)
      ) {
        return this.errorResponse(
          403,
          res,
          "Access denied. Admin privileges required."
        );
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return this.errorResponse(401, res, "Invalid credentials");
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          roleId: user.roleId,
          role: user.role.name,
          emailVerified: user.emailVerified,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1d" }
      );

      // Return user data and token
      delete user.dataValues.password;
      delete user.dataValues.otp;
      delete user.dataValues.otpExpiresAt;

      return this.successResponse(
        200,
        res,
        { user, token },
        "Admin login successful"
      );
    } catch (error) {
      console.error("Admin login error:", error);
      return this.serverErrorResponse(res, "Login failed");
    }
  };

  getLoggedInUser = async (req, res) => {
    try {
      // Get user ID from the authenticated request
      const userId = req.user.id;

      // Find the user with all details
      const user = await UserRepo.findUser({
        where: { id: userId },
        attributes: { exclude: ["password"] }, // Exclude password from the response
      });

      if (!user) {
        return this.errorResponse(404, res, "User not found");
      }

      return this.successResponse(
        200,
        res,
        user,
        "User data retrieved successfully"
      );
    } catch (error) {
      console.error("Error fetching user data:", error);
      return this.serverErrorResponse(res, "Failed to retrieve user data");
    }
  };

  getAllUsers = async (req, res) => {
    try {
      // Extract query parameters
      const {
        page = 1,
        limit = 10,
        search = "",
        sortBy = "createdAt",
        sortOrder = "DESC",
        roleId: filterRoleId,
      } = req.query;

      // Build the query
      const offset = (parseInt(page) - 1) * parseInt(limit);

      // Build where clause
      const whereClause = {};

      // Add search functionality
      if (search) {
        whereClause[db.Sequelize.Op.or] = [
          { email: { [db.Sequelize.Op.like]: `%${search}%` } },
          { username: { [db.Sequelize.Op.like]: `%${search}%` } },
          { firstName: { [db.Sequelize.Op.like]: `%${search}%` } },
          { lastName: { [db.Sequelize.Op.like]: `%${search}%` } },
          { phone: { [db.Sequelize.Op.like]: `%${search}%` } },
        ];
      }

      // Add role filter
      if (filterRoleId) {
        whereClause.roleId = filterRoleId;
      }

      // Execute query with pagination
      const { count, rows: users } = await UserRepo.findAndCountUsers({
        where: whereClause,
        attributes: {
          exclude: ["password", "resetCode", "resetCodeExpiresAt"],
        },
        order: [[sortBy, sortOrder.toUpperCase()]],
        limit: parseInt(limit),
        offset: offset,
        include: [
          {
            model: db.Role,
            as: "role",
            attributes: ["id", "name"],
          },
        ],
      });

      // Calculate pagination metadata
      const totalPages = Math.ceil(count / parseInt(limit));
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;

      return this.successResponse(
        200,
        res,
        {
          users,
          pagination: {
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages,
            hasNextPage,
            hasPrevPage,
          },
        },
        "Users retrieved successfully"
      );
    } catch (error) {
      console.error("Error fetching users:", error);
      return this.serverErrorResponse(res, "Failed to retrieve users");
    }
  };

}

module.exports = new UserController();
