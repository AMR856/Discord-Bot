module.exports = {
  data: {
    name: "fav-hobby",
  },
  async execute(interaction, _) {
    await interaction.reply({
      content: `Your favorite hobby is ${interaction.fields.getTextInputValue(
        "favHobbyInput"
      )}`,
    });
  },
};
