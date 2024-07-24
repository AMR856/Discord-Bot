const { SlashCommandBuilder } = require("discord.js");
const User = require("../../schemas/user");
const { authUser } = require("../../auth");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("register")
    .setDescription("Register Command"),
  async execute(interaction /*Amr_Alnas*/) {
    let user = await User.findOne({ userId: interaction.user.id });
    if (!user) {
      user = await new User({
        userId: interaction.user.id,
        isBot: interaction.user.bot,
        userName: interaction.user.username,
        globalName: interaction.user.globalName,
        avatar: interaction.user.avatar
          ? interaction.guild.avatar
          : "None.",
      });
      await user.save().catch(console.error);
      await interaction.reply({
        content: `New User added and his/her name is: ${interaction.user.username}`,
      });
    } else {
      await interaction.reply({
        content: `You're already register idiot??`,
      });
    }
  },
};
