const {
  SlashCommandBuilder,
  ActionRowBuilder,
  SelectMenuBuilder,
  SelectMenuOptionBuilder,
} = require("discord.js");

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
    const label = interaction.options._hoistedOptions[0]["value"];
    const menu = new SelectMenuBuilder()
      .setCustomId(label == "learn-coding" ? "learn-coding" : "Nothing")
      .setMinValues(1)
      .setMaxValues(1)
      .setOptions([
        new SelectMenuOptionBuilder({
          label: "C",
          value:
            "https://www.youtube.com/watch?v=EjavYOFoJJ0&list=PLdo5W4Nhv31a8UcMN9-35ghv8qyFWD9_S",
        }),
        new SelectMenuOptionBuilder({
          label: "Python",
          value:
            "https://www.youtube.com/watch?v=mvZHDpCHphk&list=PLDoPjvoNmBAyE_gei5d18qkfIe-Z8mocs&pp=iAQB",
        }),
        new SelectMenuOptionBuilder({
          label: "JavaScript",
          value:
            "https://www.youtube.com/watch?v=GM6dQBmc-Xg&list=PLDoPjvoNmBAx3kiplQR_oeDqLDBUDYwVv&pp=iAQB",
        }),
      ]);
    await interaction.reply({
      components: [new ActionRowBuilder().addComponents(menu)],
    });
  },
};
