const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Ping command to return a ping"),
  async execute(interection, client) {
    const message = await interection.deferReply(
      {fetchReply: true}
    );
    console.log("Got called");
    console.log(interection);
    const newMessage = `API Latency: ${client.ws.ping}\nClient Ping: ${message.createdTimestamp - interection.createdTimestamp}\nGot handled`;
    await interection.editReply(
      {content: newMessage}
    );
  }
};
