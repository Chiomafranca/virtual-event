const express = require("express");
const { register, login, enableTwoFactor } = require("../controller/auth");
const { isAdmin } = require("../middleware/roleMiddleware");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Register route - no auth required
router.post("/register", register);

// Login route - no auth required
router.post("/login", login);

// Enable Two-Factor Authentication route - requires auth and admin check
router.put("/enable-2fa", verifyToken, isAdmin, enableTwoFactor);
module.exports = router;
