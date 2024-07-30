const { SlashCommandBuilder } = require("discord.js");
const { authUser } = require(`../../auth`);
const axios = require('axios');
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("randomj")
    .setDescription("Returns a random joke"),
  async execute(interaction, _) {
    if (!(await authUser(interaction))) return;
    const url = process.env.JOKES_URL;
    const headers = {
      'X-Api-Key': process.env.API_KEY
    };
  axios.get(url, { headers: headers })
    .then(async (response) => {
      await interaction.reply({
        content: response.data[0].joke
      });
      await wait(4000);
      await interaction.followUp({
        content: 'Hahahahaha'
      });
    })
    .catch(err => {
      console.error(err);
    });
  },
};
