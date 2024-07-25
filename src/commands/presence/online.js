const { SlashCommandBuilder, ActivityType } = require("discord.js");
const { authUser } = require(`../../auth`);
module.exports = {
  data: new SlashCommandBuilder()
    .setName("online")
    .setDescription("Sets the presence of the bot to online"),
  async execute(interaction, client) {
    if (!(await authUser(interaction))) return;
    client.user.setPresence({
      activities: [
        {
          name: "I was online in the first place",
          type: ActivityType.Custom
        },
      ],
      status: 'online'
    });
    await interaction.reply({
      content: `Status has been changed`,
    });
  },
};
