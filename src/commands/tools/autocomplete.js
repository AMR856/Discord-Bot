const { SlashCommandBuilder } = require("discord.js");
// const request = require('request');


module.exports = {
  data: new SlashCommandBuilder()
    .setName("autocomplete")
    .setDescription("Returns an autocomplete list of Harry Potter chars")
    .addStringOption((option) =>
      option
        .setName("character")
        .setDescription("The name of the Charcater")
        .setAutocomplete(true)
        .setRequired(true)
    ),
  async autocomplete(interaction, client) {
    const focusedValue = interaction.options.getFocused();
    const filtered = [];
    for (const char of client.charsArray) {
      if (char.startsWith(focusedValue)) filtered.push(char);
    }
    await interaction.respond(
      filtered.slice(0, 25).map((choice) => ({name: choice, value: choice}))
    );
  },
  async execute(interaction, client) {
    let requiredObject = {};
    const userInput = interaction.options.getString('character');
    for (const char of client.objectArray) {
      if (char.name === userInput) requiredObject = char;
    }
    interaction.reply({
      content: `${requiredObject.name} House is ${requiredObject.house}`
    });
  },
};
