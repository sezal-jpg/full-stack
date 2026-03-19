const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true, // always store emails in lowercase to avoid duplicates like User@gmail vs user@gmail
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },

    // We store the refresh token in the DB so we can invalidate it on logout
    refreshToken: {
      type: String,
      default: null,
    },

    // Account balance for our banking demo
    balance: {
      type: Number,
      default: 1000, // new users start with ₹1000 as a welcome balance
    },
  },
  {
    timestamps: true, // auto adds createdAt and updatedAt
  }
);

// Before saving a user, hash their password
// We use a "pre" hook so this happens automatically every time a user is saved
userSchema.pre("save", async function (next) {
  // Only hash the password if it was actually changed (avoids re-hashing on other updates)
  if (!this.isModified("password")) return next();

  // Salt rounds = 10 is a good balance between security and performance
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// A helper method to check if a given password matches the stored hash
userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
