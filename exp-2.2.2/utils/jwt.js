const jwt = require("jsonwebtoken");

// Generate a short-lived access token (used to access protected routes)
const generateAccessToken = (userId) => {
  return jwt.sign(
    { id: userId },                              // payload — we only store the user ID
    process.env.ACCESS_TOKEN_SECRET,             // secret key from .env
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY } // e.g. "15m"
  );
};

// Generate a long-lived refresh token (used to get a new access token when it expires)
const generateRefreshToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY } // e.g. "7d"
  );
};

// Verify an access token and return the decoded data
// Returns null if the token is invalid or expired
const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    return null; // token was bad — let the caller handle it
  }
};

// Verify a refresh token
const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    return null;
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
