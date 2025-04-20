const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const authenticateToken = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/admin.middleware");

/******* Authentication APIS *******/

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.post("/forget-password", UserController.forgotPassword);
router.post("/reset-password", UserController.resetPassword);
router.post("/verify-otp", UserController.verifyOtp);
router.post("/resend-otp", UserController.resendOtp);
router.post("/admin-login", UserController.adminLogin);

/******* User APIS *******/

router.get("/me", authenticateToken, UserController.getLoggedInUser);
router.get("/all", authenticateToken, isAdmin, UserController.getAllUsers);

module.exports = router;
