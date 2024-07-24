const {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
} = require("discord.js");
const { authUser } = require("../../auth");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("get-avatar")
    .setType(ApplicationCommandType.User),
  async execute(interaction) {
    if (!(await authUser(interaction))) return;
    await interaction.reply({
      content: `${interaction.targetUser.displayAvatarURL()}`,
    });
  },
};
