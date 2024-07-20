const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Returns an embed"),
  async execute(interaction, client) {
    const memberCount = interaction.guild.memberCount;
    const embed = new EmbedBuilder()
      .setTitle("English Cafe embed message")
      .setDescription("No one asked about your opinion")
      .setColor(0x304adb)
      .setImage(client.user.displayAvatarURL())
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp(Date.now())
      .setAuthor({
        url: "https://github.com/AMR856",
        iconURL: interaction.user.displayAvatarURL(),
        name: interaction.user.tag,
      })
      .setFooter({
        // iconURL: client.user.displayAvatarURL(),
        iconURL: interaction.user.displayAvatarURL(),
        text: interaction.user.tag,
      })
      .setURL("https://github.com/AMR856")
      .addFields([
        {
          name: "Server Name",
          value: "English Cafe",
          inline: true,
        },
        {
          name: "Members Count",
          value: `${memberCount}`,
          inline: true,
        },
      ]);
    await interaction.reply({
      embeds: [embed],
    });
  },
};
