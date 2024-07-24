const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Ping command to return a ping"),
  async execute(interaction, client) {
    const message = await interaction.deferReply({ fetchReply: true });
    console.log("Got called");
    const newMessage = `API Latency: ${client.ws.ping}\nClient Ping: ${
      message.createdTimestamp - interaction.createdTimestamp
    }\nGot handled`;
    await interaction.editReply({ content: newMessage });
  },
};
