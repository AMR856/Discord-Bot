module.exports = {
  data: {
    name: "not-found",
  },
  async execute(interaction, _) {
    await interaction.reply({
      content: "We don't have this button idiota 😂😂",
    });
  },
};
