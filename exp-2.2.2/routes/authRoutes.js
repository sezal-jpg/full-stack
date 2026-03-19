const express = require("express");
const router = express.Router();

const { register, login, refreshToken, logout } = require("../controllers/authController");
const { protect } = require("../middleware/auth");

// Public routes — no token needed
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);  // send refreshToken in body to get new accessToken

// Protected — must be logged in to log out
router.post("/logout", protect, logout);

module.exports = router;
