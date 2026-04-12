// Experiment 3.1.2 & 3.1.3 — JWT verification and role-based guard middleware
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'supersecretjwtkey2025';

// verifies the Bearer token from Authorization header
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Missing token' });
  }

  try {
    // decode and attach user info to request
    req.user = jwt.verify(token, SECRET);
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// blocks non-admin users from reaching the route
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }
  next();
};

module.exports = { verifyToken, requireAdmin };
