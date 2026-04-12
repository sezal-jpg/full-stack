// Experiment 3.1.2 & 3.1.3 — Protected routes with JWT and role-based access
const express = require('express');
const { verifyToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// accessible by any authenticated user
router.get('/protected', verifyToken, (req, res) => {
  res.json({
    message: `Welcome ${req.user.username}`,
    user: { id: req.user.id, username: req.user.username, role: req.user.role },
  });
});

// accessible only by admin role — blocks regular users
router.get('/admin', verifyToken, requireAdmin, (req, res) => {
  res.json({
    message: 'Admin dashboard data',
    user: { id: req.user.id, username: req.user.username, role: req.user.role },
    stats: {
      totalUsers: 2,
      activeRoutes: 4,
      serverStatus: 'Healthy',
    },
  });
});

module.exports = router;
