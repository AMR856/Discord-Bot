const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Returns an embed"),
  async execute(interection, client) {
    const memberCount = interection.guild.memberCount;
    const embed = new EmbedBuilder()
    .setTitle("English Cafe embed message")
    .setDescription("What you do think about this embed?")
    .setColor(0x304ADB)
    .setImage(client.user.displayAvatarURL())
    .setThumbnail(client.user.displayAvatarURL())
    // .setTimestamp(Date.now())
    .setAuthor({
      url: 'https://github.com/AMR856',
      iconURL: interection.user.displayAvatarURL(),
      name: interection.user.tag
  })
    .setFooter({
      iconURL: client.user.displayAvatarURL(),
      text: client.user.tag
    })
    .setURL('https://github.com/AMR856')
    .addFields([
      {
        name: 'Server Name',
        value: 'English Cafe',
        inline: true
      },
      {
        name: 'Members Count',
        value: `${memberCount}`,
        inline: true
      }
    ]);
    await interection.reply({
      embeds: [embed]
    });
  }
};
