const mongoose = require("mongoose");

const balanceSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "User ID is a required field"],
    trim: true,
  },
  guildId: {
    type: String,
    required: [true, "Guild Id is a required field"],
    trim: true,
  },
  balance: {
    type: Number,
    default: 0,
    trim: true
  },
});


const Balance = mongoose.model("Balance", balanceSchema, 'balances');
module.exports = Balance;
