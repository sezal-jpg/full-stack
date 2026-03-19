const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Try to connect to MongoDB using the URI from .env
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    // If connection fails, print the error and exit — no point running the server without a DB
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
