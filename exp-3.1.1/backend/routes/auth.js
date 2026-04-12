// Experiment 3.1.1 & 3.1.2 — Auth routes for registration and JWT login
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'supersecretjwtkey2025';

// register a new user (used by seed script and optionally by admin)
router.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const user = new User({ username, password, role });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    // duplicate username hits unique index
    res.status(400).json({ error: err.message });
  }
});

// login — validates credentials and returns signed JWT
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // sign token with user id, username, and role
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: `Welcome ${user.username}`,
      token,
      role: user.role,
      username: user.username,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
