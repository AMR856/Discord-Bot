const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("button")
    .setDescription("Returns a button")
    .addStringOption((option) =>
      option
        .setName("label")
        .setDescription("The label of the button")
        .setRequired(true)
    ),
  async execute(interaction, _) {
    const label = interaction.options._hoistedOptions[0]["value"];
    const button = new ButtonBuilder()
      .setCustomId(label == "get-github" ? "get-github" : "get-linkedin")
      .setLabel("Click me")
      .setStyle(ButtonStyle.Primary);
    await interaction.reply({
      components: [new ActionRowBuilder().addComponents(button)],
    });
  },
};
