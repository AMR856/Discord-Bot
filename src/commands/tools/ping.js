const { SlashCommandBuilder } = require("discord.js");
const { authUser } = require(`../../auth`);


module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Ping command to return a ping"),
  async execute(interaction, client) {
    if (!(await authUser(interaction))) return;
    const message = await interaction.deferReply({ fetchReply: true });
    const newMessage = `API Latency: ${client.ws.ping}\nClient Ping: ${
      message.createdTimestamp - interaction.createdTimestamp
    }\nGot handled`;
    await interaction.editReply({ content: newMessage });
  },
};
