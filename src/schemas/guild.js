const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
  guildId: {
    type: String,
    required: [true, "Guild Id is a required field"],
    trim: true,
  },
  guildName: {
    type: String,
    required: [true, "Guild Name is a required field"],
    trim: true,
  },
  guildIcon: {
    type: String,
    trim: true,
  },
});


const Guild = mongoose.model("Guild", guildSchema, 'guilds');
module.exports = Guild;
