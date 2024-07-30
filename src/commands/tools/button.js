const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { authUser } = require("../../auth");
const fs = require("fs");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("button")
    .setDescription("Available Buttons:get-count,get-linkedin,get-github")
    .addStringOption((option) =>
      option
        .setName("label")
        .setDescription("The label of the button")
        .setRequired(true)
    ),
  async execute(interaction, _) {
    const mainPath = `${process.env.HOME}/${process.env.FOLDER_NAME}/src`;
    if (!(await authUser(interaction))) return;
    const label = interaction.options._hoistedOptions[0]["value"];
    let buttonNames = fs.readdirSync(`${mainPath}/components/buttons`);
    buttonNames = buttonNames.map((button) => button.split(".")[0]);
    const requiredButton = buttonNames.filter((button) => button === label);
    if (requiredButton.length === 0) {
      const button = new ButtonBuilder()
        .setCustomId("not-found")
        .setLabel("Just click")
        .setStyle(ButtonStyle.Primary);
      await interaction.editReply({
        components: [new ActionRowBuilder().addComponents(button)],
      });
      return;
    }
    const button = new ButtonBuilder()
      .setCustomId(requiredButton[0])
      .setLabel(requiredButton[0])
      .setStyle(ButtonStyle.Primary);
    await interaction.editReply({
      components: [new ActionRowBuilder().addComponents(button)],
    });
  },
};
