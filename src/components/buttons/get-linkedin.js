module.exports = {
  data: {
    name: 'get-linkedin'
  },
  async execute(interaction, _) {
    await interaction.reply({
      content: 'https://www.linkedin.com/in/amr-alnas-64a4ab244/'
    });
  }
};
