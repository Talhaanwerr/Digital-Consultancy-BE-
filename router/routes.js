const express = require("express");
const router = express.Router();
const userRoutes = require("./user.route.js");
const individualTaxReturnRoutes = require("./individualTaxReturn.route.js");

router.use("/users", userRoutes);
router.use("/returns", individualTaxReturnRoutes);

module.exports = router;
