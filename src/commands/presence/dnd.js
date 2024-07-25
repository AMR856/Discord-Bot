const { SlashCommandBuilder, ActivityType } = require("discord.js");
const { authUser } = require(`../../auth`);
module.exports = {
  data: new SlashCommandBuilder()
    .setName("dnd")
    .setDescription("Sets the Presence of the dnd"),
  async execute(interaction, client) {
    if (!(await authUser(interaction))) return;
    client.user.setPresence({
      activities: [
        {
          name: "Don't disturb me",
          type: ActivityType.Custom
        },
      ],
      status: 'dnd'
    });
    await interaction.reply({
      content: `Status has been changed`,
    });
  },
};
