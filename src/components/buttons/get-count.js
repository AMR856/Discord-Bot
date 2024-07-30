module.exports = {
  data: {
    name: "get-count",
  },
  async execute(interaction, _) {
    await interaction.reply({
      content: `${interaction.guild.memberCount}`,
    });
  },
};
