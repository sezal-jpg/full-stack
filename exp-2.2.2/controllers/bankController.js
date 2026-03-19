const User = require("../models/User");

const transactionLog = {};

const addTransaction = (userId, type, amount, balanceAfter) => {
  if (!transactionLog[userId]) transactionLog[userId] = [];
  transactionLog[userId].push({
    type,
    amount,
    balanceAfter,
    date: new Date().toISOString(),
  });
};


const getBalance = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Balance fetched successfully.",
      data: {
        accountHolder: req.user.name,
        balance: req.user.balance,
        currency: "INR",
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const deposit = async (req, res) => {
  try {
    const { amount } = req.body;

    // Validate the deposit amount
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid deposit amount (greater than 0).",
      });
    }

    // Add the amount to the user's current balance
    const user = await User.findById(req.user._id);
    user.balance += Number(amount);
    await user.save({ validateBeforeSave: false });

    addTransaction(user._id.toString(), "DEPOSIT", amount, user.balance);

    res.status(200).json({
      success: true,
      message: `₹${amount} deposited successfully.`,
      data: {
        deposited: amount,
        newBalance: user.balance,
      },
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// WITHDRAW 
const withdraw = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid withdrawal amount (greater than 0).",
      });
    }

    const user = await User.findById(req.user._id);

    // Can't withdraw more than what's in the account
    if (amount > user.balance) {
      return res.status(400).json({
        success: false,
        message: `Insufficient funds. Your current balance is ₹${user.balance}.`,
      });
    }

    user.balance -= Number(amount);
    await user.save({ validateBeforeSave: false });

    addTransaction(user._id.toString(), "WITHDRAWAL", amount, user.balance);

    res.status(200).json({
      success: true,
      message: `₹${amount} withdrawn successfully.`,
      data: {
        withdrawn: amount,
        newBalance: user.balance,
      },
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


//  TRANSACTION STATEMENT 
const getStatement = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const history = transactionLog[userId] || [];

    res.status(200).json({
      success: true,
      message: "Transaction statement fetched.",
      data: {
        accountHolder: req.user.name,
        totalTransactions: history.length,
        transactions: history,
      },
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// GET PROFILE 
const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        balance: req.user.balance,
        memberSince: req.user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getBalance, deposit, withdraw, getStatement, getProfile };
