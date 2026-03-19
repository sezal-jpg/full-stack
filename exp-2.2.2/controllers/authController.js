const User = require("../models/User");
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("../utils/jwt");

// REGISTER 
// Creates a new user account
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation — make sure all fields are filled in
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email and password.",
      });
    }

    // Check if someone already registered with this email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    // Create the user — the password gets hashed automatically via our pre-save hook
    const user = await User.create({ name, email, password });

    res.status(201).json({
      success: true,
      message: "Account created successfully! You can now log in.",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// LOGIN 
// Validates credentials and hands out both tokens
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // Look up the user — same vague error for wrong email or wrong password
    // (we don't want to hint which one was wrong for security reasons)
    const user = await User.findOne({ email });
    if (!user || !(await user.isPasswordCorrect(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Generate both tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Save the refresh token in DB — this lets us invalidate it on logout
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false }); // skip full validation on this save

    res.status(200).json({
      success: true,
      message: "Logged in successfully.",
      data: {
        user: { id: user._id, name: user.name, email: user.email },
        accessToken,
        refreshToken,
        note: "Access token expires in 15 minutes. Use the refresh token to get a new one.",
      },
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// REFRESH TOKEN 
// When the access token expires, the client sends the refresh token to get a new access token
const refreshToken = async (req, res) => {
  try {
    const { refreshToken: token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Refresh token is required.",
      });
    }

    // Verify the token signature first
    const decoded = verifyRefreshToken(token);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Refresh token is invalid or expired. Please log in again.",
      });
    }

    // Also check that the token matches what we stored in the DB
    // This ensures logged-out tokens can't be reused
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== token) {
      return res.status(401).json({
        success: false,
        message: "Refresh token has been invalidated. Please log in again.",
      });
    }

    // Issue a fresh access token
    const newAccessToken = generateAccessToken(user._id);

    res.status(200).json({
      success: true,
      message: "New access token issued.",
      data: {
        accessToken: newAccessToken,
      },
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// LOGOUT 
// Clears the refresh token from the DB — effectively ending the session
const logout = async (req, res) => {
  try {
    // req.user is set by the protect middleware
    await User.findByIdAndUpdate(req.user._id, { refreshToken: null });

    res.status(200).json({
      success: true,
      message: "Logged out successfully. Your refresh token has been invalidated.",
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { register, login, refreshToken, logout };
