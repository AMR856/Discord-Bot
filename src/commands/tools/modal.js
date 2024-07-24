const {
  SlashCommandBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");
const { authUser } = require("../../auth");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("modal")
    .setDescription("Makes a modal as you can see"),
  async execute(interaction, _) {
    if (!(await authUser(interaction))) return;
    const modal = new ModalBuilder()
      .setCustomId("fav-hobby")
      .setTitle("Favorite Hobby?");

    const textInput = new TextInputBuilder()
      .setCustomId("favHobbyInput")
      .setLabel("What is your favorite Hobby?")
      .setRequired(true)
      .setStyle(TextInputStyle.Short);
    modal.addComponents(new ActionRowBuilder().addComponents(textInput));
    await interaction.showModal(modal);
  },
};
