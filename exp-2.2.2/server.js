require("dotenv").config(); // load environment variables from .env first
const express = require("express");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const bankRoutes = require("./routes/bankRoutes");

const app = express();

// Parse incoming JSON request bodies
app.use(express.json());


// Health check — useful for verifying the server is up
app.get("/", (req, res) => {
  res.json({
    message: "Banking JWT API is running!",
    endpoints: {
      auth: "/api/auth",
      bank: "/api/bank (protected)",
    },
  });
});

app.use("/api/auth", authRoutes); // register, login, refresh, logout
app.use("/api/bank", bankRoutes); // balance, deposit, withdraw, statement (all protected)

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found.`,
  });
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB first, then start listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  });
});
