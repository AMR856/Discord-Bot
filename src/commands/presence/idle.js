const { SlashCommandBuilder, ActivityType } = require("discord.js");
const { authUser } = require(`../../auth`);
module.exports = {
  data: new SlashCommandBuilder()
    .setName("idle")
    .setDescription("Sets the Presence of the bot"),
  async execute(interaction, client) {
    if (!(await authUser(interaction))) return;
    client.user.setPresence({
      activities: [
        {
          name: 'Youtube',
          type: ActivityType.Watching
        },
      ],
      status: 'idle'
    });
    await interaction.reply({
      content: `Status has been changed`,
    });
  },
};
