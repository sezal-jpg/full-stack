import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

import express from 'express';
import connectDB from './src/config/db.js';
import categoryRoutes from './src/routes/CategoryRoutes.js';
import productRoutes from './src/routes/ProductRoutes.js';

const app = express(); // Create express application

// Middleware to parse incoming JSON requests
app.use(express.json());

// Routes for category and product APIs
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

// Default route to check if server is running
app.get('/', (req, res) => {
  res.send('E-commerce catalog API is running');
});

// Set server port from environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// Connect to database and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});