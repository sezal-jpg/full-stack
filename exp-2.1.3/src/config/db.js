import mongoose from 'mongoose';

// Function to connect our application with MongoDB database
const connectDB = async () => {
  try {
    // Get MongoDB URL from .env file, if not present use local database
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';

    // Connecting to MongoDB using mongoose
    await mongoose.connect(uri);

    // If connection is successful print message
    console.log('MongoDB connected');
  } catch (err) {
    // If any error occurs while connecting, print error message
    console.error('MongoDB connection error:', err.message);

    // Stop the application if database connection fails
    process.exit(1);
  }
};

// Exporting the function so it can be used in index.js
export default connectDB;