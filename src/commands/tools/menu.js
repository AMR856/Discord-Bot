const {
  SlashCommandBuilder,
  ActionRowBuilder,
  SelectMenuBuilder,
  SelectMenuOptionBuilder,
} = require("discord.js");
const { authUser } = require("../../auth");
const fs = require("fs");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("menu")
    .setDescription("Returns a menu to choose from.")
    .addStringOption((option) =>
      option
        .setName("label")
        .setDescription("The label of the button")
        .setRequired(true)
    ),
  async execute(interaction, _) {
    if (!(await authUser(interaction))) return;
    const label = interaction.options._hoistedOptions[0]["value"];
    const jsonData = fs.readFileSync(`${__dirname}/../../json/channels.json`);
    const myObjects = JSON.parse(jsonData);
    const menu = new SelectMenuBuilder()
      .setCustomId(label == "learn-coding" ? "learn-coding" : "Nothing")
      .setMinValues(1)
      .setMaxValues(1)
      .setOptions(
        myObjects.map((obj) => new SelectMenuOptionBuilder(obj))
      );
    await interaction.reply({
      components: [new ActionRowBuilder().addComponents(menu)],
    });
  },
};
