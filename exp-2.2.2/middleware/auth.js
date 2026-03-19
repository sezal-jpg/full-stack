const { verifyAccessToken } = require("../utils/jwt");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    // Tokens come in the Authorization header as: "Bearer <token>"
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Split "Bearer <token>" and grab just the token part
    const token = authHeader.split(" ")[1];

    // Try to decode the token using our secret
    const decoded = verifyAccessToken(token);

    if (!decoded) {
      // Token is either expired or tampered with
      return res.status(401).json({
        success: false,
        message: "Token is invalid or has expired. Please log in again.",
      });
    }

    // Token is valid — fetch the user from DB and attach them to the request
    // so route handlers can access req.user directly
    const user = await User.findById(decoded.id).select("-password -refreshToken");

    if (!user) {
      // Edge case: token was valid but user was deleted from DB
      return res.status(401).json({
        success: false,
        message: "User belonging to this token no longer exists.",
      });
    }

    req.user = user;
    next(); // all good, move on to the actual route handler

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while verifying the token.",
    });
  }
};

module.exports = { protect };
