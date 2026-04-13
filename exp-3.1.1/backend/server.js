// Experiment 3.1.2 & 3.1.3 — Express server with JWT auth and RBAC
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

const app = express();

// allow requests from the React dev server

const allowedOrigins = [
  'http://localhost:5173',
  'https://full-stack-mwpa.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// connect to MongoDB for RBAC user storage
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// mount route handlers
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
