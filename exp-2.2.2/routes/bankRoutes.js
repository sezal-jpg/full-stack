const express = require("express");
const router = express.Router();

const { getBalance, deposit, withdraw, getStatement, getProfile } = require("../controllers/bankController");
const { protect } = require("../middleware/auth");

// No one gets in without a valid JWT
router.use(protect);

router.get("/balance", getBalance);          // check your balance
router.post("/deposit", deposit);            // add money
router.post("/withdraw", withdraw);          // take money out
router.get("/statement", getStatement);      // view transaction history
router.get("/profile", getProfile);          // view account details

module.exports = router;
