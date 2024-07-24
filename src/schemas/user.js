const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "User ID is a required field"],
    trim: true,
  },
  isBot: {
    type: String,
    required: [true, "IsBot is a required field"],
    trim: true,
  },
  userName: {
    type: String,
    required: [true, "Username is a required field"],
    trim: true,
  },
  globalName: {
    type: String,
    trim: true,
  },
  avatar: {
    type: String,
    trim: true,
  },
});


const User = mongoose.model("User", userSchema, 'users');
module.exports = User;
