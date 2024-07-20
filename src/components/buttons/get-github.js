module.exports = {
  data: {
    name: 'get-github'
  },
  async execute(interaction, _) {
    await interaction.reply({
      content: 'https://github.com/AMR856'
    });
  }
};
