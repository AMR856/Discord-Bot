const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const { authUser } = require(`../../auth`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("timeout a member from the server")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("What is the member you would like to timeout")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Why do you want to timeout him")
    )
    .addIntegerOption((option) =>
      option
        .setName("time")
        .setDescription("How long do you want to time him out (In minutes)")
    ),
  async execute(interaction, client) {
    if (!(await authUser(interaction))) return;
    const user = interaction.options.getUser("target");
    let reason = interaction.options.getString("reason");
    let time = interaction.options.getInteger("time");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!reason) reason = "No reason is provided";
    if (!time) time = null;
    const embed = new EmbedBuilder()
      .setTitle("Timing out Message")
      .setDescription(reason)
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
        iconURL: interaction.user.displayAvatarURL(),
        text: interaction.user.tag,
      })
      .setURL("https://github.com/AMR856");
    await user
      .send({
        embeds: [embed],
      })
      .catch(console.error());

    await member
      .timeout(time === null ? null : time * 60 * 1000)
      .catch(console.error);

    await interaction.reply({
      content: `${user.tag} has been timed out`,
    });
  },
};
