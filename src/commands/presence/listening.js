const { SlashCommandBuilder, ActivityType } = require("discord.js");
const { authUser } = require(`../../auth`);
module.exports = {
  data: new SlashCommandBuilder()
    .setName("listen")
    .setDescription("Sets the Presence of the bot"),
  async execute(interaction, client) {
    if (!(await authUser(interaction))) return;
    client.user.setPresence({
      activities: [
        {
          name: 'To Spotify',
          type: ActivityType.Listening
        },
      ],
      status: 'idle'
    });
    await interaction.reply({
      content: `Status has been changed`,
    });
  },
};
